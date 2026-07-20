# Project Execution Rules

These PERMANENT rules apply to every future phase of the PORTF_SD project:

1. Never sacrifice maintainability for short-term speed.
2. Prefer modular, reusable components over duplicated code.
3. Do not modify working code unless required.
4. Before changing an existing file, check for dependencies.
5. Preserve backward compatibility whenever possible.
6. Keep components small and focused on one responsibility.
7. Never hardcode content that should be configurable.
8. Keep animations isolated from business logic.
9. Minimize unnecessary dependencies.
10. Maintain consistent naming conventions.
11. Optimize for readability over cleverness.
12. If an architectural decision changes, explain why before implementing.
13. After every phase, run a full verification and fix issues before continuing.

# Maintainability & Content Centralization

1. Prioritize long-term maintainability over rapid implementation.
2. Design the codebase so that adding new projects, updating skills, changing personal information, replacing themes, or extending sections can be done by editing centralized configuration or content files (e.g., `src/data/`, `src/lib/constants.ts`) rather than modifying multiple components.
3. Avoid tightly coupled code, duplicated logic, oversized components, unnecessary dependencies, and breaking changes.
4. Treat this repository as a production-grade portfolio that will be maintained for years.
