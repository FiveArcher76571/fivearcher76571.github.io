# SAIEngine Semantics

This page will go over the core functionality of the engine, outlining how you can use it to make things!

## How to Make a Thing

To understand how to actually make something in SAIEngine, you need to learn the different aspects that go into it. Luckily, if you've ever worked with engines like Godot, Unreal, or especially Unity (or anything similar), you might already be familiar with the Scene-Actor-Component setup that SAIEngine works. These three parts can be described as follows...

### Scenes

Think of these as the "where" in your project. A scene holds all the *things* in your project, and switching to a different scene will switch out all those things.

**Scene files are simply JSON tables**, like below:

```json
{
	"actors": [ // A scene is just a list of actors!
		{
			"name": "title_text", // Name your actors, get creative!
			"components": { // Actors have components, see below for what these are
				"1": {
					"type": "Transform",
                    "x": 500,
                    "y": 200
				},
				"2": {
					"type": "DrawText",
					"message": "THE GAUNTLET"
				},
                "3": { // You can have as many or as few components as you wanna!
					"type": "TitleInput"
				}
			}
		}
	] // Well-formed JSON is the best kind of JSON, don't forget your commas (I know I have)
}
```

You may have already pieced it together by now, but those *things* are known in the engine as **actors**, and a scene can have as many or as few of these as you want. You can even have 0 actors in a scene (but uhh I don't imagine that'd be too useful).

### Actors

These are the "what" in your project. Actors live in your scenes and are meant to do anything you need. You list out all the actors you need in your scene. That's why a scene file is simply a list of actors! As for what those actors actually do...

### Components

These are the "how" of your actors, as in how your actors do things. You may have a bunch of actors, but if they don't have a *script* they're not gonna be very productive, right? So, giving them a component allows them to actually do things. You can assign as many or as few components to actors, and multiple actors can have different instances of the same component (so no need to copy code or anything). **Components are Lua scripts**, which means that if you can do something in Lua, you can do it in SAIEngine.

Here's an example of a Lua component:

```lua
DrawText = { -- Components are simply Lua tables! (can you see a theme here yet?)
	message = "???", -- This is a variable that your component can use

	OnStart = function(self) -- This is a function your component will run
		self.transform = self.actor:GetComponent("Transform")
	end,

	OnUpdate = function(self) -- This and the above function are "lifecycle functions", more on those later
		Text.Draw(self.message, self.transform.x, self.transform.y, "NotoSans-Regular", 70, 255, 255, 255, 255)
        -- See how the "message" variable is accessed in the above line?
        ConsolePrint()
	end,

    ConsolePrint = function() -- This is a function you can make and run as you need
        Console.Log("Hi!") -- An example of an API function you can call!
    end
}
```

As you can see, a SAIEngine component takes the form of a Lua table. That table can hold variables and functions, so they're very versatile! Now, that *does* mean that you can put literally all of your functionality into a single component (a GOD COMPONENT, if you will), but uhhh that gets pretty messy pretty fast, so I don't really recommend it.

You now have the where, what, and how. That's most of what you need to make a fully functional thing! Make actors, assign components to make them do things, and put them all in respective scenes, and you're good to go!

Granted, there's still some more to cover, but if you understand this Scene-Actor-Component structure, you'll get the rest just fine.

## The Resources Folder

Everything that you create to run in SAIEngine lives in a folder titled `resources`. As mentioned in the home page, this folder **must be placed adjacent to the engine executable**. This folder can contain anything from assets (like images, audio files, etc.) to Lua scripts and everything in between. Basically, if it's not in `resources`, it's not getting read.