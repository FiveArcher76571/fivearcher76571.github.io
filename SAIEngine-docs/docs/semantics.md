# SAIEngine Semantics

This page will go over the core functionality of the engine, outlining how you can use it to make things!

## How to Make a Thing

To understand how to actually make something in SAIEngine, you need to learn the different aspects that go into it. Luckily, if you've ever worked with engines like Godot, Unreal, or especially Unity (or anything similar), you might already be familiar with the Scene-Actor-Component setup that SAIEngine works. These three parts can be described as follows...

### Scenes

Think of these as the "where" in your project. 

## The Resources Folder

Everything that you create to run in SAIEngine lives in a folder titled `resources`. As mentioned in the home page, this folder **must be placed adjacent to the engine executable**. This folder can contain anything from assets (like images, audio files, etc.) to Lua scripts and everything in between. Basically, if it's not in `resources`, it's not getting read.