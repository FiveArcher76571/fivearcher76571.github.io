# API Reference

###### Last Updated: August 26th, 2026

This is a page of the full SAIEngine API, including the various functions available to you as a developer.

This page is organized by class or namespace (sorted alphabetically, unless it makes sense to not do that), with the available member functions of said class or namespace listed under each.

Each function will include a return type if the function is non-void , as well as a code snippet describing its usage

## Lifecycle Functions

Functions to be defined in components that are called as the program progresses

Listed by order of their execution (TL;DR: OnStart -> OnUpdate -> OnLateUpdate -> OnDestroy)

### OnStart

Called on component instantiation (once). If the component is defined in the initial scene, this is frame 0 (before the program begins)

#### Usage

```lua
Component = {
    OnStart = function(self)

        -- All code here is executed once, on the frame this component is instantiated

    end
}
```

### OnUpdate

Called every frame after (and not including) component instantiation until the component is destroyed

#### Usage

```lua
Component = {
    OnUpdate = function(self)

        -- All code here is executed every frame

    end
}
```

### OnLateUpdate

Called every frame, but after OnUpdate is called for every other component loaded in the scene

#### Usage

```lua
Component = {
    OnUpdate = function(self)

        -- All code here is executed every frame

    end,
    
    OnLateUpdate = function(self)

        -- All code here is executed every frame after OnUpdate is finished
        -- For example, if this is the only component in the scene...
        -- This code will execute after the above code in OnUpdate is executed

    end
}
```

### OnDestroy

Called on component destruction (once)

#### Usage

```lua
Component = {
    OnDestroy = function(self)

        -- All code here is executed on the frame this component is destroyed

    end
}
```

## vec2 (object type)

A data type to store two floats (i.e. a geometric vector)

This simply exposes the `x` and `y` properties of the underlying `glm::vec2` data type

### vec2.x (property) -> float

The X coordinate of the vector (first of two numbers)

### vec2.y (property) -> float

The Y coordinate of the vector (second of two numbers)

## ivec2 (object type)

A data type to store two integers (i.e. a geometric vector)

This simply exposes the `x` and `y` properties of the underlying `glm::ivec2` data type

### ivec2.x (property) -> int

The X coordinate of the vector (first of two numbers)

### ivec2.y (property) -> int

The Y coordinate of the vector (second of two numbers)

## Actor (object type)

A data type for actors, allowing access to actor information and stored component details

**Note**: these functions are used on actor objects, and as such you need to **use a colon** to refer to them.

### actor:GetName() -> string

Gets the actor's name

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
actor_name = this_actor:GetName() -- Note the colon
```

### actor:GetID() -> int

Gets the actor's ID

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
actor_id = this_actor:GetID() -- Note the colon
```

### actor:AddComponent(string: type) -> ComponentRef

Add the given component type to the actor

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
this_actor:AddComponent("type") -- Note the colon
```

### actor:GetComponent(string: type) -> ComponentRef

Gets a reference to an actor's component given its type. If there are more than one of this component on the actor, it returns the first one

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
component = this_actor:GetComponent("type") -- Note the colon
```

### actor:GetComponents(string: type) -> table[ComponentRef]

Gets references to an actor's component(s) given its type and returns a table of them (note the plural!)

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
component_table = this_actor:GetComponents("type") -- Note the colon
```

### actor:GetComponentByKey(string: key) -> ComponentRef

Gets a reference to an actor's component given its key

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
component = this_actor:GetComponentByKey("key") -- Note the colon
```

### actor:RemoveComponent(ComponentRef: component)

Remove the given component from the actor

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
component_to_remove = this_actor:GetComponent("ComponentType")
this_actor:RemoveComponent(component_to_remove) -- Note the colon
```

## Actor (namespace)

Functions that create, modify, and destroy actors themselves

### Actor.Instantiate(string: template_name) -> ActorRef

Create a new actor; this clones the given template actor `template_name`

#### Usage

```lua
new_actor = Actor.Instantiate("template")
```

### Actor.Find(string: actor_name) -> ActorRef

Gets a reference to an actor in the scene given its name

If there are multiple actors with the given name, this will return the first one

#### Usage

```lua
found_actor = Actor.Find("actor_name")
```

### Actor.FindAll(string: actor_name) -> table[ActorRef]

Gets references to all actors in the scene with the given name and returns a table of them

#### Usage

```lua
found_actors = Actor.FindAll("actor_name")
```

### Actor.Destroy(ActorRef: actor)

Destroys the given actor; this also deactivates all the given actor's components (equivalent to calling `OnDestroy` on all of its components)

#### Usage

```lua
actor_to_destroy = Actor.Find("actor_name") -- Gets the actor and assigns it to actor_to_destroy
Actor.Destroy(actor_to_destroy)
```

## Application

Functions that track application-level information

### Application.GetFrame() -> int

Get the current frame number as an integer

#### Usage

```lua
current_frame = Application.GetFrame()
```

### Application.OpenURL(string: url)

Opens your computer's default browser to the given URL `url`

#### Usage

```lua
Application.OpenURL("https://www.youtube.com/@ScottTheWoz") -- An important YouTube channel
```

### Application.Quit()

Quits the program safely on the frame it's called

(on the C++ level, it simply calls `exit(0)`)

#### Usage

```lua
Application.Quit()
```

### Application.Sleep(int: ms)

Pauses the application for `ms` milliseconds universally. Everything stops.

#### Usage

```lua
Application.Sleep(5000) -- Pauses for 5,000 milliseconds (5 seconds)
```

## Camera

Functions that check and manipulate camera parameters

### Camera.GetPosition() -> vec2

Gets the camera's position in world coordinates as a vec2 object

#### Usage

```lua
cam_pos = Camera.GetPosition() -- Camera's position as a vec2 object
cam_x = cam_pos.x -- Gets camera's X position
cam_y = cam_pos.y -- Gets camera's Y position
```

### Camera.SetPosition(int: x, int: y, bool: easing)

Sets the camera's position and whether to ease it there or not

#### Usage

```lua
Camera.SetPosition(0, 0, true) -- Smoothly shift the camera to world position (0,0)
```

### Camera.GetZoom() -> float

Gets the camera's current zoom factor

#### Usage

```lua
zoom_factor = Camera.GetZoom() -- Gets the zoom factor as a float
```

### Camera.SetZoom(float: zoom)

Sets the camera's zoom factor

#### Usage

```lua
Camera.SetZoom(0.5) -- Zoom the camera out twice the default distance
Camera.SetZoom(2.0) -- Zoom the camera in twice the default distance
Camera.SetZoom(1.0) -- Zoom the camera to the default distance
```

## Console

Functions to output text to the console

### Console.Print(string: message)

Print a standard message to the console followed by a newline (`std::endl` in C++)

#### Usage

```lua
Console.Print("Hello!!!") -- Outputs "Hello!!!" (without quotes) to the console
```

### Console.PrintError(string: message)

Print an error message to the console (text colored red) followed by a newline (`std::endl` in C++)

#### Usage

```lua
Console.PrintError("Error: AAAA") -- Outputs "Error: AAAA" (without quotes) to the console
```

## Image

Functions to render/draw onto the screen (supports .PNG files for images)

### Image.Draw(string: image_filename, float: x, float: y)

Draw the given image file `image_filename.png` at world coordinates (x,y)

#### Usage

```lua
Image.Draw("sprite", 0, 0) -- Draws the image "sprite.png" at the center of the camera (0,0)
```

### Image.DrawEx(string: image_filename, float: pos_x, float: pos_y, int: rotation, float: scale_x, float: scale_y, float: pivot_x, float: pivot_y, int: r, int: g, int: b, int: a, int: sorting_order)

Draw the given image file `image_filename.png` to the world with extended parameters:

- X position (world coordinates)
- Y position (world coordinates)
- Rotation (degrees clockwise)
- X scale multiplier
- Y scale multiplier
- Pivot X position ("center" x-coordinate of image)
- Pivot Y position ("center" y-coordinate of image)
- Red color parameter (0-255)
- Green color parameter (0-255)
- Blue color parameter (0-255)
- Alpha parameter (0-255)
- Sorting order (relative to other rendered images)

#### Usage

```lua
-- Draws image "sprite.png" at world coordinate (0,0), rotated 90-degrees clockwise, twice as big,
-- with its center at (50,50) in image pixels (this will fall at the given world coordinate),
-- with blue colors removed, at full opacity, sorted at order 10
-- (the sorting order only matters if you have other images rendered on screen at the same time)
Image.DrawEx("sprite", 0, 0, 90, 2, 2, 50, 50, 255, 255, 0, 255, 10)
```

### Image.DrawUI(string: image_filename, int: x, int: y)

Draw the given image file `image_filename.png` at window coordinates (x,y)

This draws images on top of all other screen elements (i.e. like UI elements)

#### Usage

```lua
Image.DrawUI("sprite", 0, 0) -- Draws the image "sprite.png" at the top left corner of the screen
```

### Image.DrawUIEx(string: image_filename, float: pos_x, float: pos_y, int: r, int: g, int: b, int: a, int: sorting_order)

Draw the given image file `image_filename.png` to the window with extended parameters:

- X position (world coordinates)
- Y position (world coordinates)
- Red color parameter (0-255)
- Green color parameter (0-255)
- Blue color parameter (0-255)
- Alpha parameter (0-255)
- Sorting order (relative to other rendered images)

#### Usage

```lua
-- Draws image "sprite.png" at window coordinate (0,0),
-- with blue colors removed, at full opacity, sorted at order 10
-- (the sorting order only matters if you have other images rendered on screen at the same time)
Image.DrawUIEx("sprite", 0, 0, 255, 255, 0, 255, 10)
```

### Image.DrawPixel(int: x, int: y, int: r, int: g, int: b, int: a)

Draw a pixel of the given RGBA color to the screen at window coordinates (x,y)

#### Usage

```lua
Image.DrawPixel(100, 100, 255, 255, 255, 255) -- Draw a white pixel at window coordinates (100, 100)
```

## Input

Functions that manage input from the keyboard, mouse, or MIDI controller

For a guide on which keys, mouse buttons, and MIDI keys can be queried, see the Input Guide page

### Input.GetKeyDown(string: keycode) -> bool

Returns true if the key `keycode` was pressed down this frame

This function returns true only on the frame it's pressed, and doesn't return true again until the key is released and pressed again

#### Usage

```lua
-- The message only gets printed on the first frame the space key is pressed down
if Input.GetKeyDown('space') then Console.Print('Space just pressed!') end
```

### Input.GetKey(string: keycode) -> bool

Returns true if the key `keycode` is currently being pressed

This function returns true every frame the key is held **after** the frame it was first pressed

#### Usage

```lua
-- The message gets printed every frame W is held down (except the frame it was first pressed)
if Input.GetKeyPressed('w') then Console.Print('W is held down!') end
```

### Input.GetKeyUp(string: keycode) -> bool

Returns true if the key `keycode` has just been released

This function returns true only on the frame it's released, and doesn't return true again until the key is pressed and released again

#### Usage

```lua
-- The message only gets printed on the first frame W is released
if Input.GetKeyUp('w') then Console.Print('W just released!') end
```

### Input.GetMouseButtonDown(int: mouse_btn) -> bool

Returns true if the mouse button `mouse_btn` was pressed down this frame

This function returns true only on the frame it's pressed, and doesn't return true again until the button is released and pressed again

#### Usage

```lua
-- The message only gets printed on the first frame the left mouse button is pressed down
if Input.GetMouseButtonDown(0) then Console.Print('Left click just pressed!') end
```

### Input.GetMouseButton(int: mouse_btn) -> bool

Returns true if the mouse button `mouse_btn` is currently being pressed

This function returns true every frame the mouse button is held **after** the frame it was first pressed

#### Usage

```lua
-- The message gets printed every frame the left mouse button is held down (except the frame it was first pressed)
if Input.GetMouseButton(0) then Console.Print('Left click is held down!') end
```

### Input.GetMouseButtonUp(int: mouse_btn) -> bool

Returns true if the mouse button `mouse_btn` has just been released

This function returns true only on the frame it's released, and doesn't return true again until the mouse button is pressed and released again

#### Usage

```lua
-- The message only gets printed the first frame left click is released
if Input.GetMouseButtonUp(0) then Console.Print('Left click just released!') end
```

### Input.GetMousePosition() -> vec2

Returns a vector of the current mouse position in window coordinates

#### Usage

```lua
mouse_pos = Input.GetMousePosition() -- Gets the vec2
mouse_x = mouse_pos.x -- Mouse's X pos
mouse_y = mouse_pos.y -- Mouse's Y pos
```

### Input.GetMouseScroll() -> float

Gets the amount the mouse wheel has been scrolled this frame

Delta is positive away from you and negative towards you

#### Usage

```lua
mouse_scroll = Input.GetMouseScroll() -- Gets the amount scrolled
if mouse_scroll ~= 0 then Console.Print("Mouse scrolled: " .. mouse_scroll) end -- Prints the amount scrolled only if it's been scrolled
```

### Input.HideCursor()

Hides the mouse cursor while it's over the window

#### Usage

```lua
Input.HideCursor() -- Hides the cursor
```

### Input.ShowCursor()

Shows the mouse cursor (e.g. after it's been hidden)

#### Usage

```lua
Input.ShowCursor() -- Shows the cursor
```

### Input.EnableMIDIControl()

Enables a plugged-in MIDI controller to be used as input for your project

This only needs to be called once for the entire program (e.g. in a component's OnStart)

#### Usage

```lua
key = Input.GetMIDI(60) -- Returns an error
Input.EnableMIDIControl() -- Enables MIDI controller support
key = Input.GetMIDI(60) -- Works!
```

### Input.GetMIDIDown(int: midi_key) -> bool

Returns true if the MIDI key `midi_key` was pressed down this frame

This function returns true only on the frame it's pressed, and doesn't return true again until the key is released and pressed again

#### Usage

```lua
-- The message only gets printed on the first frame MIDI key 60 is pressed down
if Input.GetMIDIDown(60) then Console.Print('MIDI key 60 just pressed!') end
```

### Input.GetMIDI(int: midi_key) -> bool

Returns true if the MIDI key `midi_key` is currently being pressed

This function returns true every frame the key is held **after** the frame it was first pressed

#### Usage

```lua
-- The message gets printed every frame MIDI key 60 is held down (except the frame it was first pressed)
if Input.GetMIDI(60) then Console.Print('MIDI key 60 is held down!') end
```

### Input.GetMIDIUp(int: midi_key) -> bool

Returns true if the MIDI key `midi_key` has just been released

This function returns true only on the frame it's released, and doesn't return true again until the key is pressed and released again

#### Usage

```lua
-- The message only gets printed the first frame MIDI key 60 is released
if Input.GetMIDIUp(0) then Console.Print('MIDI key 60 just released!') end
```

### Input.GetMIDIVelocity(int: midi_key) -> int

Gets the velocity of the given MIDI key `midi_key` on the current frame

If `midi_key` isn't an actual MIDI key, returns -1

#### Usage

```lua
vel = Input.GetMIDIVelocity(60) -- Get velocity of MIDI key 60
if vel > 0 then Console.Print('MIDI key 60 velocity: ' .. vel) -- Output the velocity of MIDI key 60 if it is being pressed
```

## Scene

Functions that get scene info

### Scene.GetName() -> string

Gets the current scene's name

#### Usage

```lua
curr_scene = Scene.GetName() -- Gets the current scene's name
```

### Scene.Switch(string: scene_name)

Switches the scene to the given scene `scene_name` (pulls from the file `scene_name.scene`)

This unloads all actors and their components (**does NOT call OnDestroy**), and loads the actors and components of the new scene

#### Usage

```lua
Scene.Switch('scene2') -- Switches to the scene "scene2.scene"
Scene.Switch(Scene.GetName()) -- Equivalent to reloading the current scene
```

## Text

Functions to render text on screen

You must have a font file for text rendering to work

### Text.Draw(string: text, int: x, int: y, string: font_file, int: font_size, int: r, int: g, int: b, int: a)

Draws text to the screen with the following parameters:

- Text string to render
- X position (window coordinates)
- Y position (window coordinates)
- Font to use (`font_file.ttf`)
- Font size
- Red color parameter (0-255)
- Green color parameter (0-255)
- Blue color parameter (0-255)
- Alpha parameter (0-255)

#### Usage

```lua
-- Draws the text "Hello!!!" (without quotations) to the screen
-- at the top left corner of the screen (0,0), using font "font.ttf",
-- at size 16, colored red, at full opacity
Text.Draw("Hello!!!", 0, 0, "font", 16, 255, 0, 0, 255)
```
