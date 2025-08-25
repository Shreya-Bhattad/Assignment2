# Aura Requirements - Clarification Queries

Below are queries and points for clarification regarding the Aura No-Code Visual Editor requirements:

1. Should the initial implementation support only the four listed components (Text, TextArea, Image, Button), or do you expect more to be added soon?
   => for initial implementation support only listed components

2. For localStorage, should each user's work be auto-saved, or only on explicit action (e.g., Save button)?
   => only on explicit save button

3. Is there a preferred UI library (e.g., React, Vue, plain JS), or should I wait for your framework decision?
   => you can use React

4. Should the editor support responsive design (e.g., mobile preview), or is desktop-only sufficient for now?
   => desktop-only sufficient for now

5. Are there any accessibility requirements (e.g., keyboard navigation, ARIA labels)?
   => no

6. Is user authentication or multi-user collaboration out of scope for the MVP?
   => yes

---

## Additional Questions

7. Should there be any error handling or user feedback for invalid component properties (e.g., invalid image URL, out-of-range font size)?
   => yes

8. Are there specific browsers or minimum browser versions that Aura must support?
   => should support chrome

9. Should the localStorage structure support multiple saved projects, or just a single workspace at a time?
   => single workspace at a time
