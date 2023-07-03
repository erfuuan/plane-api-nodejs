# Django imports
from django.db import models
from django.conf import settings

# Module imports
from . import BaseModel


ROLE_CHOICES = (
    (20, "Owner"),
    (15, "Admin"),
    (10, "Member"),
    (5, "Guest"),
)


class Workspace(BaseModel):
    name = models.CharField(max_length=255, verbose_name="Workspace Name")
    logo = models.URLField(verbose_name="Logo", blank=True, null=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="owner_workspace",
    )
    slug = models.SlugField(max_length=100, db_index=True, unique=True)
    company_size = models.PositiveIntegerField(default=10)

    def __str__(self):
        """Return name of the Workspace"""
        return self.name

    class Meta:
        verbose_name = "Workspace"
        verbose_name_plural = "Workspaces"
        db_table = "workspaces"
        ordering = ("-created_at",)


class WorkspaceMember(BaseModel):
    workspace = models.ForeignKey(
        "db.Workspace", on_delete=models.CASCADE, related_name="workspace_member"
    )
    member = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="member_workspace",
    )
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=10)
    company_role = models.TextField(null=True, blank=True)
    view_props = models.JSONField(null=True, blank=True)

    class Meta:
        unique_together = ["workspace", "member"]
        verbose_name = "Workspace Member"
        verbose_name_plural = "Workspace Members"
        db_table = "workspace_members"
        ordering = ("-created_at",)

    def __str__(self):
        """Return members of the workspace"""
        return f"{self.member.email} <{self.workspace.name}>"


class WorkspaceMemberInvite(BaseModel):
    workspace = models.ForeignKey(
        "db.Workspace", on_delete=models.CASCADE, related_name="workspace_member_invite"
    )
    email = models.CharField(max_length=255)
    accepted = models.BooleanField(default=False)
    token = models.CharField(max_length=255)
    message = models.TextField(null=True)
    responded_at = models.DateTimeField(null=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=10)

    class Meta:
        unique_together = ["email", "workspace"]
        verbose_name = "Workspace Member Invite"
        verbose_name_plural = "Workspace Member Invites"
        db_table = "workspace_member_invites"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.workspace.name} {self.email} {self.accepted}"


class Team(BaseModel):
    name = models.CharField(max_length=255, verbose_name="Team Name")
    description = models.TextField(verbose_name="Team Description", blank=True)
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="members",
        through="TeamMember",
        through_fields=("team", "member"),
    )
    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="workspace_team"
    )

    def __str__(self):
        """Return name of the team"""
        return f"{self.name} <{self.workspace.name}>"

    class Meta:
        unique_together = ["name", "workspace"]
        verbose_name = "Team"
        verbose_name_plural = "Teams"
        db_table = "teams"
        ordering = ("-created_at",)


class TeamMember(BaseModel):
    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="team_member"
    )
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team_member")
    member = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="team_member"
    )

    def __str__(self):
        return self.team.name

    class Meta:
        unique_together = ["team", "member"]
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"
        db_table = "team_members"
        ordering = ("-created_at",)


class WorkspaceTheme(BaseModel):
    workspace = models.ForeignKey(
        "db.Workspace", on_delete=models.CASCADE, related_name="themes"
    )
    name = models.CharField(max_length=300)
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="themes"
    )
    colors = models.JSONField(default=dict)

    def __str__(self):
        return str(self.name) + str(self.actor.email)

    class Meta:
        unique_together = ["workspace", "name"]
        verbose_name = "Workspace Theme"
        verbose_name_plural = "Workspace Themes"
        db_table = "workspace_themes"
        ordering = ("-created_at",)
