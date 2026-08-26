# API Reference

###### Last Updated: August 26th, 2026

This is a page of the full SAIEngine API, including the various functions available to you as a developer.

This page is organized by class or namespace (sorted alphabetically, unless it makes sense to not do that), with the available member functions of said class or namespace listed under each. Each function will include a code snippet describing its usage.

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

## Actor (object type)

Functions that read and modify actors and their components

**Note**: these functions are used on actor objects, and as such you need to **use a colon** to refer to them.

### actor:GetName()

Gets the actor's name

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
actor_name = this_actor:GetName() -- Note the colon
```

### actor:GetID()

Gets the actor's ID

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
actor_id = this_actor:GetID() -- Note the colon
```

### actor:AddComponent(string: type)

Add the given component type to the actor

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
this_actor:AddComponent("type") -- Note the colon
```

### actor:GetComponent(string: type)

Gets a reference to an actor's component given its type. If there are more than one of this component on the actor, it returns the first one

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
component = this_actor:GetComponent("type") -- Note the colon
```

### actor:GetComponents(string: type)

Gets references to an actor's component(s) given its type and returns a table of them (note the plural!)

#### Usage

```lua
this_actor = Actor.Find("actor_name") -- Gets the actor and assigns it to this_actor
component_table = this_actor:GetComponents("type") -- Note the colon
```

### actor:GetComponentByKey(string: key)

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

### Actor.Instantiate(string: template_name)

Create a new actor; this clones the given template actor `template_name`

#### Usage

```lua
new_actor = Actor.Instantiate("template")
```

### Actor.Find(string: actor_name)

Gets a reference to an actor in the scene given its name

If there are multiple actors with the given name, this will return the first one

#### Usage

```lua
found_actor = Actor.Find("actor_name")
```

### Actor.FindAll(string: actor_name)

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

### Application.GetFrame()

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

### Camera.GetPosition()

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

### Camera.GetZoom()

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
