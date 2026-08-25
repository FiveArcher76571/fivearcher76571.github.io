# API Reference

###### Last Updated: August 24th, 2026

This is a page of the full SAIEngine API, including the various functions available to you as a developer.

This page is organized by class or namespace (sorted alphabetically, unless it makes sense to not do that), with the available member functions of said class or namespace listed under each. Each function will include a code snippet describing its usage.

## Actor (class)

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

## Application (namespace)

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

(on the C++ level, it simply calls `exit(0);`)

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
