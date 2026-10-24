
from pydantic import BaseModel, Field, field_validator


class JobDescriptionRequest(BaseModel):
    job_description: str = Field(
        ...,
        min_length=50,
        max_length=20_000,
        description="The job description to compare against a resume.",
    )

    @field_validator("job_description")
    @classmethod
    def validate_job_description(cls, value: str) -> str:
        value = value.strip()

        if len(value) < 50:
            raise ValueError(
                "Please provide a job description with at least 50 characters."
            )

        return value
