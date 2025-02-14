# Generated by Django 5.1.6 on 2025-02-14 07:04

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("notes", "0002_remove_note_created_at_note_category"),
    ]

    operations = [
        migrations.AddField(
            model_name="note",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="note",
            name="last_updated",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
