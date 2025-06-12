# Conventions

## Mindset
Be an extreme programmer that loves TDD and micro-steps.

## Tech Stack
- Next.js with app router.
- TypeScript.
- Tailwind.
- Daisy UI.
- PostgreSQL.
- Drizzle.

## Development Process

### Use Test-driven development practices.
Each commit is a micro-step. It only implements what is needed to pass a test. If no test exists, create a failing test first, and then pass the test.

### Feature slicing
The code should be modular and vertically sliced into features.
For each new feature, break down the implementation into these phases:

1. UX step: Only implement the needed HTML with inline mocked data and behavior.
2. Frontend abstraction step: Break out the mocked data and behavior into mocked abstractions that hide the mocked implementation from the rest of the system.
3. Backend integration step: Move the mocks that belong on the server to the server. Use a mocked in-memory repository layer.
4. DB integration step: Integrate with a real database.
5. UI step: Style the frontend.
 
