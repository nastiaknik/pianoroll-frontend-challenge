# PianoRoll Frontend Task

## Introduction

This project is a frontend application for browsing and interacting with Piano Rolls, a core element of [Piano Roll](https://pianoroll.io).
App is deployed on gh-pages.
[Live version of the app](https://nastiaknik.github.io/pianoroll-frontend-challenge/) is avaliable by the web-address.

To run this project locally, follow these steps:

1.  Clone the repository to your local machine:

```bash
  git clone  https://github.com/nastiaknik/pianoroll-frontend-chalenge.git
```

2.  Navigate to the project directory:

```bash
  cd pianoroll-frontend-challenge
```

3.  Install dependencies:

```bash
  npm install
```

4.  Start the development server:

```bash
  npm start
```

This will start the application and you can view it in your browser at http://localhost:3000/pianoroll-frontend-challenge.

## Content

### Main page

- Load and view piano rolls by clicking the "Load Piano Rolls!" button
- Click on a Piano Roll to view it in detail.

![Main Page](./assets/main-page.png)

### Main View page

- The selected Piano Roll will be displayed enlarged on the main view.
- Use the selection tool to click and drag to select a range on the Piano Roll.
- The selected range is visually highlighted, and a number of selected notes are displayed in a notification. Additionally, the selection data, including start and end points, is logged in the console.
- To clear the selection, click anywhere on the Piano Roll.

![Main View](./assets/main-view.png)
![Interactive Selection Tool](./assets/selection.png)

## Features

- Responsive grid layout for displaying Piano Rolls.
- Clickable Piano Rolls with enlarged view on selection.
- Vertical list display for additional Piano Rolls.
- Interactive selection tool for selecting a range on the Piano Roll.
- Real-time visual feedback during selection.
- Console logging of selection data.
- Consistent styling for different screen resolutions.

## Technologies Used

- HTML
- React
- JavaScript
- Styled Components
- React Icons
- Fetch API
- React Toastify

## Task description

This is what the starting point looks like:

<img width="666" alt="image" src="https://github.com/Nospoko/pianoroll-frontend-challenge/assets/8056825/daf35d32-f4e5-4a00-bbe8-78ecec2f2011">

We recommend you start by understanding how the piano roll is structured and displayed, and what is the underlying data structure. If at any point you have any questions, you can join our [discord channel](https://discord.gg/2RadyyxADa) where we'll be providing active support.

Right now this is a Vanilla JS project. You can work on it as such, or you can use any framework you want - just make sure you document the process of running the application with all the requirements.

You can change, refactor or rewrite the existing code as much as you want.

### Part 1: Display

We want to implement an interface following the design similar to YouTube. There are two states we need to implement:

#### Grid layout

```
+--------------+   +--------------+   +--------------+
|              |   |              |   |              |
|  Piano Roll  |   |  Piano Roll  |   |  Piano Roll  |
|              |   |              |   |              |
+--------------+   +--------------+   +--------------+
+--------------+   +--------------+   +--------------+
|              |   |              |   |              |
|  Piano Roll  |   |  Piano Roll  |   |  Piano Roll  |
|              |   |              |   |              |
+--------------+   +--------------+   +--------------+
+--------------+   +--------------+   +--------------+
|              |   |              |   |              |
|  Piano Roll  |   |  Piano Roll  |   |  Piano Roll  |
|              |   |              |   |              |
+--------------+   +--------------+   +--------------+
                          ...
```

#### Main View

```
+-----------------------------------+  +--------------+
|                                   |  |              |
|                                   |  |  Piano Roll  |
|                                   |  |              |
|        Main Piano Roll            |  +--------------+
|                                   |  +--------------+
|                                   |  |              |
|                                   |  |  Piano Roll  |
+-----------------------------------+  |              |
                                       +--------------+
                                             ...
```

Here are development tasks to build this interface:

1. **Implement Grid Layout**: Display the Piano Rolls in a responsive grid layout on the main page.
2. **Implement Interactive Selection**: Make each Piano Roll in the grid clickable. Upon clicking an item, it should become the main element on the page, enlarging for better visibility.
3. **List Display**: Simultaneously, display the rest of the Piano Rolls in a vertical list on the right side of the page, similar to how videos are listed on YouTube’s watch page. Ensure that the list is scrollable if there are more items than can fit on the screen.
4. **Styling**: Apply styling to make the grid and its items visually appealing. Ensure that Piano Rolls are identifiable and have a consistent size across different screen resolutions.

### Part 2: Interactive Selection Tool

We want to give the user a possibility to select a fragment of the visible Piano Roll. This is a similar functionality to what you can see on [this prodigy demo](https://demo.prodi.gy/?=null&view_id=audio_manual). Here's our reference layout:

```
+-----------+-------------+---------+  +--------------+
|           |             |         |  |              |
|           |             |         |  |  Piano Roll  |
|           |             |         |  |              |
|           |             |         |  +--------------+
|           |             |         |  +--------------+
|           |             |         |  |              |
|           x1            x2        |  |  Piano Roll  |
+-----------+-------------+---------+  |              |
                                       +--------------+
                                             ...
```

Your task is to implement a tool or an overlay on the piano roll that allows users to click and drag to select a range. The tool should be able to:

1. **Start Selection**: Initiate a selection when the user clicks on a point.
2. **Show Visual Feedback**: Provide real-time visual feedback as the user drags to extend the selection.
3. **Capture Selection Data**: Once a selection is made, capture the data regarding the start and end points of the selection. It's enough to `console.log` the selection. Bonus points if you can get the number of notes within the selection.
4. **Visual Representation of Selection**: Ensure that the selected range is clearly represented on the piano roll. You could change the color, add a border, or use any other visual cue to show the selection.

## Submission

1. **Demonstration**: Fork this repository and work on your code there. When you're finished, update the readme with a screencast recording showing your version of the application.
2. **Submit Your Work**: Send us the link to your repository, add a link to your linkedin profile in the message. Submission email address: frontend@pianoroll.io

### Evaluation Criteria

1. **Functionality**: The selection mechanism should work as described, allowing users to select a range on the piano roll.
2. **User Experience**: The tool should provide a good user experience, with intuitive controls and clear visual feedback.
3. **Code Quality**: The code should be clean, easy to read, well-organized, and properly documented.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or create a pull request.
