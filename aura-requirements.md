# Aura Requirements Document

Please add your requirements for the Aura No-Code Visual Editor below. You can use headings, bullet points, and code blocks as needed.

## Overview

To empower our internal teams and accelerate content creation, we are launching a strategic initiative to develop an in-house, "No-Code" visual editor, codenamed "Aura".

The long-term vision is to provide teams like Marketing and Product with a tool that allows them to build and modify simple web layouts and promotional materials without direct engineering support

Please refer the below online tools to understand the editor functionality, how to select and drop an element on the canvas and then changing the properties of that element: · Beefree · GrapesJs

## Functional Requirements

1. Core Functional Requirements

· Component Palette: A panel displays a list of pre-defined components that can be added to the editor.

· Drag and Drop: Users must be able to drag components from the palette and drop them onto a freeform canvas area.

· Freeform Canvas: Dropped components can be selected and moved freely to any position within the canvas.

· Dynamic Properties Panel: When a component on the canvas is selected, a properties panel must display the specific settings for that component.

· Real-Time Updates: Any change made in the properties panel must be reflected on the selected component in the canvas instantly.

· Preview & Copy Html: Provide the ability to preview the final html and also copy the final html to clipboard.

· Please note: We do not need to build/integrate API to store/persist the content. Kindly leverage browser localstorage for this, treat localstorage as the DB.

2. UI Layout

The application should have a three-panel layout:

· Left (20% width): Palette Panel - Contains the list of available components.

· Middle (60% width): Canvas Panel - The main interactive area where components are placed and manipulated.

· Right (20% width): Properties Panel - Displays the configuration options for the currently selected component.

3. Component Palette & Properties

The Palette should contain the following components. When selected, the Properties Panel should display the corresponding options.

· Text

o The below properties should be provided on the right panel:

§ Font-size: Number Input / Slider

§ Font-weight: Dropdown ('400 - Normal', '700 - Bold')

§ Color: color picker

· TextArea

o The below properties should be provided on the right panel:

§ Font-size: Number Input / Slider

§ Color: color picker

§ Text-Align: Button Group ('Left', 'Center', 'Right')

· Image

o The below properties should be provided on the right panel:

§ Image URL: Text Input

§ Alt Text: Text Input

§ Object Fit: Dropdown ('Cover', 'Contain', 'Fill')

§ Border Radius: Number Input / Slider

§ Height: Number Input / Slider

§ Width: Number Input / Slider

· Button

o The below properties should be provided on the right panel:

§ URL: Text Input

§ Button Text: Text Input

§ Font-size: Number Input / Slider

§ Padding: Number Input / Slider

§ Background Color: Color Picker

§ Text Color: Color Picker

§ Border Radius: Number Input / Slider

4. Technical Constraints & Rules

· The use of comprehensive, "all-in-one" solution libraries (e.g., GrapesJS, HTML5 canvas, reactdnd etc) that solve the entire problem or part of problem is prohibited.

· The drag-and-drop functionality for positioning and moving components on the canvas must be built from scratch using native browser events (mousedown, mousemove, etc.). For this specific requirement, UI interaction libraries like react-dnd, konva.js, interact.js, etc., are prohibited.

## Non-Functional Requirements

## References

- [BeeFree](https://beefree.io/start-designing?template=empty&type=page&catalog=true&e=true)
- [GrapesJS](https://grapesjs.com/demo.html)

---

Add more sections as needed.
