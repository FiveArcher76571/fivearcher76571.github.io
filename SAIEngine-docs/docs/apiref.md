# API Reference

###### Last Updated: August 27th, 2026

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

## RAudio

Functions that manage rendered audio (e.g. MP3 and WAV files)

Rendered audio support is enabled by default

### RAudio.Play(int: channel, string: trackname, bool: loop)

Plays the audio file `trackname` on audio channel `channel`

If `loop` is set to true, loops indefinitely

#### Usage

```lua
RAudio.Play(0, "song", true) -- Play "song.wav/.mp3" on channel 0, looping forever
```

### RAudio.Pause(int: channel)

Pause the audio channel `channel`

#### Usage

```lua
RAudio.Play(0, "song", true) -- Play "song.wav/.mp3" on channel 0, looping forever
Raudio.Pause(0) -- Pause channel 0
-- (if you actually ran this code unmodified you wouldn't hear much at all)
```

### RAudio.PauseAll()

Pause all tracks currently playing

#### Usage

```lua
RAudio.PauseAll() -- Pauses all tracks playing
```

### RAudio.Resume(int: channel)

Resume the paused audio channel `channel`

#### Usage

```lua
RAudio.Pause(0) -- Pause channel 0
RAudio.Resume(0) -- Resume channel 0
```

### RAudio.ResumeAll()

Resume all paused audio channels

#### Usage

```lua
RAudio.PauseAll() -- Pauses all channels
RAudio.ResumeAll() -- Resumes all channels
```

### RAudio.SetGain(int: channel, int: gain)

Set the audio channel's gain

#### Usage

```lua
RAudio.SetGain(0, 2) -- Set channel 0's gain to 2
```

### RAudio.SetLoopPoints(int: channel, int: start_pos, int: end_pos)

Set loop points in milliseconds for the given audio channel, to be called before `RAudio.Play()`

The track will start at 0 ms when `RAudio.Play()` is called, and once it reaches `end_pos` the track will skip back to `start_pos`

#### Usage

```lua
RAudio.SetLoopPoints(0, 1000, 5000) -- Set channel 0's loop points to start at 1s and end at 5s
RAudio.Play(0, "track", true) -- Play "track.wav/.mp3" at channel 0 (using the above loop points)
```

### RAudio.ResetLoopPoints(int: channel)

Reset the loop points for `channel` to the actual start and end of the assigned audio file

#### Usage

```lua
RAudio.SetLoopPoints(0, 1000, 5000) -- Set channel 0's loop points to start at 1s and end at 5s
RAudio.Play(0, "track", true) -- Play "track.wav/.mp3" at channel 0 (using the above loop points)
RAudio.ResetLoopPoints(0) -- Reset the loop points that we set above
-- (if you were to actually run the above code, you wouldn't end up hearing the loop points at all)
```

### RAudio.GetBPM(int: channel) -> int

Get the BPM of the given channel

If you haven't set a BPM for the track, this will return -1

#### Usage

```lua
RAudio.SetBPM(0, 120) -- Sets channel 0's BPM to 120
RAudio.GetBPM(0) -- Returns 120
```

### RAudio.SetBPM(int: channel, int: BPM)

Set a BPM for the given channel

#### Usage

```lua
RAudio.SetBPM(0, 120) -- Set channel 0's BPM to 120
```

### RAudio.IsOnBeat(int: channel, int: buffer) -> bool

Checks whether, on the current frame, the given channel's track is on a new beat, +/- `buffer` in milliseconds

This function will only work if the track has a BPM set, otherwise it will always return false

#### Usage

```lua
RAudio.SetBPM(0, 120) -- Set channel 0's BPM to 120
RAudio.Play(0, "track", true) -- Play audio file "track.wav/.mp3" with looping on channel 0

-- Later on...

-- Only evaluates to true if, on this frame, the track is within 100ms of a new beat
if RAudio.IsOnBeat(0, 100) then Console.Log("On beat!!") end
```

### RAudio.GetMeasureLength(int: channel) -> int

Get the measure length of the given channel in milliseconds

If you haven't set a measure length for the track, this will return 0

#### Usage

```lua
RAudio.SetMeasureLength(0, 4) -- Sets channel 0's measure length to 4 beats
RAudio.GetBPM(0) -- Returns 4
```

### RAudio.SetMeasureLength(int: channel, int: measure_length)

Set the measure length of the given channel to `measure_length` in milliseconds

#### Usage

```lua
RAudio.SetMeasureLength(0, 4) -- Sets channel 0's measure length to 4 beats
```

### RAudio.IsNewMeasure(int: channel, int: buffer) -> bool

Checks whether, on the current frame, the given channel's track has begun a new measure, +/- `buffer` in milliseconds

This function will only work if the track has a measure length and BPM set, otherwise it will always return false

#### Usage

```lua
RAudio.SetMeasureLength(0, 4) -- Set channel 0's measure length to 4 beats
RAudio.SetBPM(0, 120) -- Set channel 0's BPM to 120
RAudio.Play(0, "track", true) -- Play audio file "track.wav/.mp3" with looping on channel 0

-- Later on...

-- Only evaluates to true if, on this frame, the track is within 100ms of a new measure
if RAudio.IsNewMeasure(0, 100) then Console.Log("New measure!!") end
```

## SAudio

Functions that manage sequenced audio (e.g. MIDI files and SF2 soundfonts)

Sequenced audio is disabled by default, and must be enabled by you

### SAudio.Enable()

Enables the use and playback of MIDI files and SF2 soundfonts

This only needs to be called once for the entire program (e.g. in a component's OnStart)

#### Usage

```lua
OnStart = function(self)

    SAudio.LoadMIDI("midi_track") -- Throws an error
    SAudio.Enable() -- Enables sequenced audio
    SAudio.LoadMIDI("midi_track") -- Works!

end
```

### SAudio.EnableMIDIController()

Enable support for playing loaded soundfonts using a MIDI controller

This only needs to be called once for the entire program (e.g. in a component's OnStart)

#### Usage

```lua
SAudio.LoadSF2("soundfont") -- Can't play it with your controller
SAudio.EnableMIDIController() -- Pressing keys will play notes!
```

### SAudio.LoadMIDI(string: midi_file)

Loads the given MIDI file `midi_file.mid`

This must be done before `SAudio.Play()` is called

#### Usage

```lua
SAudio.Play(0) -- Does nothing
SAudio.LoadMIDI("midi_file") -- Loads "midi_file.mid"
SAudio.Play(0) -- Plays the file!
-- Without loading a soundfont, you won't actually hear anything
```

### SAudio.LoadSF2(string: soundfont)

Loads the given SF2 file `soundfont.sf2`

This must be done before `SAudio.Play()` is called

#### Usage

```lua
SAudio.LoadMIDI("midi_file") -- Loads "midi_file.mid"
SAudio.LoadSF2("soundfont") -- Loads "soundfont.sf2"
SAudio.Play(0) -- With the above line, plays the MIDI file with the soundfont!
```

### SAudio.Play(int: loops)

Plays the loaded MIDI and SF2 with the given amount of loops (-1 for infinite loops)

Without loading anything, this function won't do anything

#### Usage

```lua
SAudio.Play(0) -- Does nothing
SAudio.LoadMIDI("midi_file") -- Loads "midi_file.mid"
SAudio.LoadSF2("soundfont") -- Loads "soundfont.sf2"
SAudio.Play(0) -- Plays the files!
```

### SAudio.Pause()

Pauses the currently playing track

#### Usage

```lua
SAudio.Play(0) -- Plays things loaded
SAudio.Pause() -- Pauses the track
```

### SAudio.Resume()

Resumes the currently paused track

#### Usage

```lua
SAudio.Pause() -- Pauses the track
SAudio.Resume() -- Resumes the track
```

### SAudio.GetCurrentTick() -> int

Gets the current playback position of the track in ticks

Ticks are defined by the MIDI file, but generally 1 tick = 1 beat

#### Usage

```lua
SAudio.Play(0) -- Play the track
current_tick = SAudio.GetCurrentTick() -- Gets the progress
-- Actually running this code would make current_tick = 0
```

### SAudio.GetBPM() -> int

Get the BPM of the loaded track according to FluidSynth (the backend)

#### Usage

```lua
SAudio.LoadMIDI("midi_file") -- Load the MIDI file (midi_file.mid was created at 120 BPM)
bpm = SAudio.GetBPM() -- bpm = 120
```

### SAudio.SetBPM(int: bpm)

Manually set a BPM for the loaded MIDI track

This changes it for FluidSynth (the backend)

#### Usage

```lua
SAudio.LoadMIDI("midi_file") -- Load the MIDI file (midi_file.mid was created at 120 BPM)
bpm = SAudio.GetBPM() -- bpm = 120
SAudio.SetBPM(60) -- Manually set the BPM to 60
new_bpm = SAudio.GetBPM() -- new_bpm = 60
```

### SAudio.SetReverb(float: level)

Set the reverb parameter (0 - 1 inclusive) for the loaded track

#### Usage

```lua
SAudio.LoadMIDI("midi_file") -- Loads the MIDI file
SAudio.SetReverb(0) -- Turn off reverb
SAudio.SetReverb(1) -- Max out reverb
```

### SAudio.SetGain(float: level)

Set the gain (0 - 1 inclusive, 1 by default) for the loaded track

**WARNING: IT GETS REALLY LOUD PAST THE DEFAULT**

#### Usage

```lua
SAudio.Play(0) -- Play the loaded file
SAudio.SetGain(0.5) -- Set gain to 0.5 (quieter)
```

### SAudio.SetChannelVolume(int: channel, int: level)

Set the given MIDI channel's volume to the given level (0 - 127 inclusive)

You have 16 MIDI channels (0 - 15 inclusive)

#### Usage

```lua
SAudio.Play(0) -- Play the loaded file
SAudio.SetChannelVolume(6, 0) -- Mute MIDI channel 6
SAudio.SetChannelVolume(10, 127) -- Max out MIDI channel 10's volume
```

### SAudio.SetLoopPoints(int: start_tick, int: end_tick)

Set loop points in ticks for the given audio channel, to be called before `SAudio.Play()`

The track will start at tick 0 when `SAudio.Play()` is called, and once it reaches `end_tick` the track will skip back to `start_tick`

#### Usage

```lua
SAudio.SetLoopPoints(20, 50) -- Set the track's loop points to start at beat 20 and end at beat 50
SAudio.Play(0) -- Play the loaded track (using the above loop points)
```

### SAudio.ResetLoopPoints()

Reset the loop points to the actual start and end of the loaded MIDI file

#### Usage

```lua
SAudio.SetLoopPoints(20, 50) -- Set the track's loop points to start at beat 20 and end at beat 50
SAudio.Play(0) -- Play the loaded track (using the above loop points)
SAudio.ResetLoopPoints() -- Reset the loop points that we set above
-- (if you were to actually run the above code, you wouldn't end up hearing the loop points at all)
```

### SAudio.SendKeyOn(int: key, int: channel, int: velocity)

Play MIDI key `key` on MIDI channel `channel` at velocity `velocity`

These parameters match the MIDI standard in terms of ranges (e.g. channels 0-15, etc.)

Won't do anything before `SAudio.LoadSF2()` is called

#### Usage

```lua
SAudio.LoadSF2("soundfont") -- Load the soundfont
SAudio.SendKeyOn(60, 0, 127) -- Send a note-on command for key 60 at channel 0 at velocity 127
```

### SAudio.SendKeyOff(int: key, int: channel)

Release MIDI key `key` on MIDI channel `channel`

These parameters match the MIDI standard in terms of ranges (e.g. channels 0-15, etc.)

#### Usage

```lua
SAudio.SendKeyOn(60, 0, 127) -- Send a note-on command for key 60 at channel 0 at velocity 127
SAudio.SendKeyOff(60, 1) -- Send a note-off command for a different key (if not on, does nothing)
SAudio.SendKeyOff(60, 0) -- Send a note-off command for the above key
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

## Window

Functions to get and manipulate window info

### Window.GetPos() -> ivec2

Get the window's position on the computer screen (relative to the top-left corner of the window)

#### Usage

```lua
window_pos = Window.GetPos() -- Get window position vector
window_x = window_pos.x -- Get window X position
window_y = window_pos.y -- Get window Y position
```

### Window.SetPos(int: x, int: y)

Set the window's position on the computer screen (relative to the top-left corner of the window)

```lua
Window.SetPos(0, 0) -- Move the window to the top left corner of the screen
```

### Window.GetSize() -> ivec2

Get the window's width and height in pixels (resolution)

#### Usage

```lua
window_size = Window.GetSize() -- Get window size vector
window_width = window_size.x -- Get window width
window_height = window_size.y -- Get window height
```

### Window.SetSize(int: width, int: height)

Set the window's width and height in pixels (resolution)

```lua
Window.SetSize(1280, 720) -- Set the window's size (resolution) to 1280x720
```
