# SAIEngine Semantics

To understand how to actually make something in SAIEngine, you'll need to learn a few important concepts. Luckily, if you've ever worked with engines like Godot, Unreal, or especially Unity (or anything similar), you might already be familiar with some of these!

## Scenes

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

## Actors

These are the "what" in your project. Actors live in your scenes and are meant to do anything you need. You list out all the actors you need in your scene. That's why a scene file is simply a list of actors!

 As for what these actors actually do...

## Components

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

## Actor Templates

You might find it useful to make copies of actors with certain components. For example, what if you want to make a bunch of enemies that all share the same health and weapons? For these situations, you'll want to use **actor templates**!

Here's a .template file example (these are also JSON files!):

```json
{
    "name": "enemy", // The name of the template
    "components": { // Just like scene files, you can define components for your templates
        "1": {
            "type": "Transform"
        },
        "2": {
            "type": "ImageRenderer",
            "image": "enemy"
        },
        "3": {
            "type": "EnemyMovement",
            "speed": 1
        },
        "4": {
            "type": "GameOverOnCollision"
        }
    }
}
```

By defining templates here in each of their files, you can instantiate them in your components as you please using:
```Actor.Instantiate(<template>)```

So, you now have the where, what, and how. That's most of what you need to make a fully functional thing! Make actors, assign components to make them do things, and put them all in respective scenes, and you're good to go!

Granted, there's still some more to cover, but if you understand this Scene-Actor-Component structure, you'll get the rest just fine.

## Lifecycle Functions

Actors have lifecycles. Whether that lifecycle lasts as short as a button press or as long as the program is open is, of course, up to you, but in either case you may want to have those actors do different things throughout their lives. For example, what if you want a counter to go up every frame? Or maybe you want the scene to change once you kill a certain enemy? You'll find the below lifecycle functions helpful for stuff like this!

- OnStart - *called on the frame this actor is instantiated*
- OnUpdate - *called every frame after (but not including) instantiation*
- OnLateUpdate - *called every frame after every other actor's OnUpdate function is completed*
- OnDestroy - *called on the frame this actor is destroyed*

If you include definitions to these functions in your components (mind the casing!), SAIEngine will execute the contents of these functions as the program runs.

## API Functions

Now, you can only get so far with what we've covered so far, and bare-bones Lua might not be enough for a lot of things. What about something as basic as showing something on screen? Maybe playing some audio? How about user input? That's where API functions come in! 

These are functions you can call from your components that can help you do some more complex things. Check out the following example:

```lua
PlayerMovement = {

    speed = 0.1,

    OnStart = function(self)
        self.transform = self.actor:GetComponent("Transform")
        RAudio.Play("bgm_track") -- RAudio - rendered audio playback (like WAV and MP3 files)
    end,

    OnUpdate = function(self)

		-- Below: Input - dealing with user input from the keyboard, mouse and more!
        if Input.GetKey("w") then self.transform.y = self.transform.y - self.speed end
        if Input.GetKey("s") then self.transform.y = self.transform.y + self.speed end
        if Input.GetKey("a") then self.transform.x = self.transform.x - self.speed end
        if Input.GetKey("d") then self.transform.x = self.transform.x + self.speed end

		-- Below: Window - dealing with getting/setting the program's window parameters (size, dimensions, etc.)        
        if self.transform.x < 0 then self.transform.x = 0 end
        if self.transform.x + 100 > Window.GetWidth() then self.transform.x = Window.GetWidth() - 100 end
        if self.transform.y < 0 then self.transform.y = 0 end
        if self.transform.y + 100 > Window.GetHeight() then self.transform.y = Window.GetHeight() - 100 end

        if Input.GetKey("escape") then Application.Quit() end -- Application - the software itself (quitting, frame counts, etc.)

    end
}
```

You'll find that there are a bunch more API functions at your disposal! To see them all, see the API Reference section of these docs.

## File Structure

So now you know most of the actual program stuff in SAIEngine. Now, where do these all go?

Everything that you create to run in SAIEngine lives in a folder titled `resources`. This folder can contain anything from assets (like images, audio files, etc.) to Lua components and everything in between. Basically, if it's in your `resources` folder, it'll be avalable for you to use from your code!

This is an example file structure:

```tree
SAIEngine <engine executable>
resources/
├── actor_templates/
│   └── <Actor .template files here>
├── audio/
│   └── <Audio files here>
├── component_types/
│   └── <Lua (.lua) components here>
├── fonts/
│   └── <Fonts (.ttf) here>
├── game.config <program configuration>
├── images/
│   └── <Image files go here>
├── rendering.config <window-related configuration>
└── scenes/
    └── <Scene (.scene) files here>
```

Notice how the `resources` directory is right next to the engine's executable. Be sure that's the case; if it's anywhere else it won't be read!

## [The Gauntlet (Demo Project)](https://fivearcher76571.github.io/resources/The.Gauntlet.SAIEngine.Demo.zip)

If you're interested in seeing a demo of all these concepts in action, I just so happen to have one for you! It's a game I made as part of my final submission for this engine. Feel free to look through the files and use them as you see fit (all the assets are my own, and I give you permission to mess with them).

You can find the files for the game by clicking the link in the header. Have fun!

## Conclusion

And those are the basics of understanding SAIEngine! I'm sure you LOVED reading this huge block of text. But if you need a TL;DR, I highly recommend **just messing around with it!** Actually making something using the engine is a great way to learn the ins-and-outs of how it works (and that's good advice for learning just about anything new). Check back here, in the demo project, and in the API Reference when you need a refresher, and you should be good to go!

Most importantly, hope you have fun! :D
