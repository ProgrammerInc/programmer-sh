# Sheet Component Usage Examples

## Basic Usage

```tsx
<Sheet>
  <SheetTrigger>Open Sheet</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Description text</SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <p>Sheet content goes here</p>
    </div>
    <SheetFooter>
      <Button>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Sheet Positions

### Left Side Sheet

```tsx
<Sheet>
  <SheetTrigger>Open Left Sheet</SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Side Navigation</SheetTitle>
    </SheetHeader>
    <nav className="py-4">
      <ul className="space-y-2">
        <li>Home</li>
        <li>Dashboard</li>
        <li>Settings</li>
      </ul>
    </nav>
  </SheetContent>
</Sheet>
```

### Top Sheet

```tsx
<Sheet>
  <SheetTrigger>Open Top Sheet</SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Notifications</SheetTitle>
    </SheetHeader>
    <div className="py-4">
      <p>Notification list would appear here</p>
    </div>
  </SheetContent>
</Sheet>
```

### Bottom Sheet

```tsx
<Sheet>
  <SheetTrigger>Open Bottom Sheet</SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Quick Actions</SheetTitle>
    </SheetHeader>
    <div className="grid grid-cols-4 gap-4 py-4">
      <div className="text-center">
        <div className="rounded-full bg-primary p-2 mx-auto mb-2 w-10 h-10"></div>
        <span>Share</span>
      </div>
      <div className="text-center">
        <div className="rounded-full bg-primary p-2 mx-auto mb-2 w-10 h-10"></div>
        <span>Copy</span>
      </div>
      <div className="text-center">
        <div className="rounded-full bg-primary p-2 mx-auto mb-2 w-10 h-10"></div>
        <span>Edit</span>
      </div>
      <div className="text-center">
        <div className="rounded-full bg-primary p-2 mx-auto mb-2 w-10 h-10"></div>
        <span>Delete</span>
      </div>
    </div>
  </SheetContent>
</Sheet>
```

## Forms in Sheet

```tsx
<Sheet>
  <SheetTrigger>Edit Profile</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>Make changes to your profile information.</SheetDescription>
    </SheetHeader>
    <form className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Your email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself" />
      </div>
    </form>
    <SheetFooter>
      <Button type="submit">Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Confirmation Dialog

```tsx
<Sheet>
  <SheetTrigger>Delete Account</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. Your account and all associated data will be permanently
        deleted.
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <p className="text-sm text-muted-foreground">
        Please type <span className="font-semibold">delete my account</span> to confirm.
      </p>
      <Input className="mt-2" placeholder="delete my account" />
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button variant="destructive">Delete Account</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Settings Panel

```tsx
<Sheet>
  <SheetTrigger>Settings</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Configure your application preferences.</SheetDescription>
    </SheetHeader>
    <div className="py-4 space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Appearance</h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <span>Dark Mode</span>
            <span className="text-sm text-muted-foreground">Toggle dark mode</span>
          </div>
          <Switch />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Notifications</h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <span>Email Notifications</span>
            <span className="text-sm text-muted-foreground">Receive email updates</span>
          </div>
          <Switch />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Advanced</h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <span>Developer Mode</span>
            <span className="text-sm text-muted-foreground">Enable advanced features</span>
          </div>
          <Switch />
        </div>
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Save Changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```
