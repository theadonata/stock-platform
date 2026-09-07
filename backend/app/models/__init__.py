# Import every model module here as models are added, so Alembic's env.py
# (which imports this package) registers each one on Base.metadata before
# autogenerate compares it against the DB schema. Empty for now — the first
# real models (tenant, user/role) land with the auth & roles ticket.
