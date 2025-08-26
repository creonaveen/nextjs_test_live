'use client';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';

import { AccordionDemo, accordionExampleCode } from './components/AccordionDemo';
import { AlertDemo, alertExampleCode } from './components/AlertDemo';
import { AlertDialogDemo, alertDialogExampleCode } from './components/AlertDialogDemo';
import { AspectRatioDemo, aspectRatioExampleCode } from './components/AspectRatioDemo';
import { AvatarDemo, avatarExampleCode } from './components/AvatarDemo';
import { BadgeDemo, badgeExampleCode } from './components/BadgeDemo';
import { BreadcrumbDemo, breadcrumbExampleCode } from './components/BreadcrumbDemo';
import { ButtonDemo, buttonExampleCode } from './components/ButtonDemo';
import { CardDemo, cardExampleCode } from './components/CardDemo';
import { CheckboxDemo, checkboxExampleCode } from './components/CheckboxDemo';
import { CodeExampleDialog } from './components/CodeExampleDialog';
import { ComboboxDemo, comboboxExampleCode } from './components/ComboboxDemo';
import { CommandDemo, commandExampleCode } from './components/CommandDemo';
import { DialogDemo, dialogExampleCode } from './components/DialogDemo';
import { DrawerDemo, drawerExampleCode } from './components/DrawerDemo';
import { DropdownMenuDemo, dropdownMenuExampleCode } from './components/DropdownMenuDemo';
import { HoverCardDemo, hoverCardExampleCode } from './components/HoverCardDemo';
import { InputDemo, inputExampleCode } from './components/InputDemo';
import { InputOTPDemo, InputOTPDemoTwo, inputOTPExampleCode } from './components/InputOTPDemo';
import { MenubarDemo, menubarExampleCode } from './components/MenubarDemo';
import { RadioGroupDemo, radioGroupExampleCode } from './components/RadioGroupDemo';
import { SearchBarDemo, searchBarExampleCode } from './components/SearchBarDemo';
import { SelectDemo, selectExampleCode } from './components/SelectDemo';
import { SheetDemo, sheetExampleCode } from './components/SheetDemo';
import { SkeletonDemo, skeletonExampleCode } from './components/SkeletonDemo';
import { SwitchDemo, switchExampleCode } from './components/SwitchDemo';
import { TextareaDemo, textareaExampleCode } from './components/TextareaDemo';
import { ToastDemo, toastExampleCode } from './components/ToastDemo';
import { TooltipDemo, tooltipExampleCode } from './components/TooltipDemo';
import { FormExample, formExampleCode } from './form-example';

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">Components</h1>

      <div className="grid gap-8">
        {/* Search Bar Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Search Bar</CardTitle>
            <CardDescription>Search input with icon and placeholder.</CardDescription>
          </CardHeader>
          <CardContent>
            <SearchBarDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Search Bar Component Example"
              description="Here's how to use the Search Bar component in your code."
              code={searchBarExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Button Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>Various button styles and variants.</CardDescription>
          </CardHeader>
          <CardContent>
            <ButtonDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Button Component Example"
              description="Here's how to use the Button component in your code."
              code={buttonExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Input Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Text input field with label.</CardDescription>
          </CardHeader>
          <CardContent>
            <InputDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Input Component Example"
              description="Here's how to use the Input component in your code."
              code={inputExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Textarea Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Textarea</CardTitle>
            <CardDescription>Multi-line text input field.</CardDescription>
          </CardHeader>
          <CardContent>
            <TextareaDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Textarea Component Example"
              description="Here's how to use the Textarea component in your code."
              code={textareaExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Switch Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Switch</CardTitle>
            <CardDescription>Toggle switch with label.</CardDescription>
          </CardHeader>
          <CardContent>
            <SwitchDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Switch Component Example"
              description="Here's how to use the Switch component in your code."
              code={switchExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Checkbox Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Checkbox</CardTitle>
            <CardDescription>Checkbox with label.</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckboxDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Checkbox Component Example"
              description="Here's how to use the Checkbox component in your code."
              code={checkboxExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Radio Group Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Radio Group</CardTitle>
            <CardDescription>Radio button group with labels.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroupDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Radio Group Component Example"
              description="Here's how to use the Radio Group component in your code."
              code={radioGroupExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Select Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>Dropdown select with options.</CardDescription>
          </CardHeader>
          <CardContent>
            <SelectDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Select Component Example"
              description="Here's how to use the Select component in your code."
              code={selectExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Alert Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Alert</CardTitle>
            <CardDescription>Alert message with title and description.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Alert Component Example"
              description="Here's how to use the Alert component in your code."
              code={alertExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Alert Dialog Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Dialog</CardTitle>
            <CardDescription>Dialog with alert message and actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialogDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Alert Dialog Component Example"
              description="Here's how to use the Alert Dialog component in your code."
              code={alertDialogExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Breadcrumb Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Breadcrumb</CardTitle>
            <CardDescription>Navigation breadcrumb trail.</CardDescription>
          </CardHeader>
          <CardContent>
            <BreadcrumbDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Breadcrumb Component Example"
              description="Here's how to use the Breadcrumb component in your code."
              code={breadcrumbExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Avatar Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>User avatar with fallback.</CardDescription>
          </CardHeader>
          <CardContent>
            <AvatarDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Avatar Component Example"
              description="Here's how to use the Avatar component in your code."
              code={avatarExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Badge Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Badge</CardTitle>
            <CardDescription>Various badge styles.</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Badge Component Example"
              description="Here's how to use the Badge component in your code."
              code={badgeExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Skeleton Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton</CardTitle>
            <CardDescription>Loading skeleton animation.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkeletonDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Skeleton Component Example"
              description="Here's how to use the Skeleton component in your code."
              code={skeletonExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Dialog Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog</CardTitle>
            <CardDescription>Modal dialog with form.</CardDescription>
          </CardHeader>
          <CardContent>
            <DialogDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Dialog Component Example"
              description="Here's how to use the Dialog component in your code."
              code={dialogExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Drawer Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Drawer</CardTitle>
            <CardDescription>Side drawer with form.</CardDescription>
          </CardHeader>
          <CardContent>
            <DrawerDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Drawer Component Example"
              description="Here's how to use the Drawer component in your code."
              code={drawerExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Hover Card Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Hover Card</CardTitle>
            <CardDescription>Card that appears on hover.</CardDescription>
          </CardHeader>
          <CardContent>
            <HoverCardDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Hover Card Component Example"
              description="Here's how to use the Hover Card component in your code."
              code={hoverCardExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Tooltip Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip</CardTitle>
            <CardDescription>Tooltip that appears on hover.</CardDescription>
          </CardHeader>
          <CardContent>
            <TooltipDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Tooltip Component Example"
              description="Here's how to use the Tooltip component in your code."
              code={tooltipExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Command Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Command</CardTitle>
            <CardDescription>Command palette with search.</CardDescription>
          </CardHeader>
          <CardContent>
            <CommandDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Command Component Example"
              description="Here's how to use the Command component in your code."
              code={commandExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Card Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>Card component with header, content, and footer.</CardDescription>
          </CardHeader>
          <CardContent>
            <CardDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Card Component Example"
              description="Here's how to use the Card component in your code."
              code={cardExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Accordion Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>Collapsible accordion sections.</CardDescription>
          </CardHeader>
          <CardContent>
            <AccordionDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Accordion Component Example"
              description="Here's how to use the Accordion component in your code."
              code={accordionExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Menubar Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Menubar</CardTitle>
            <CardDescription>Navigation menubar with dropdowns.</CardDescription>
          </CardHeader>
          <CardContent>
            <MenubarDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Menubar Component Example"
              description="Here's how to use the Menubar component in your code."
              code={menubarExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Sheet Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Sheet</CardTitle>
            <CardDescription>Side sheet with form.</CardDescription>
          </CardHeader>
          <CardContent>
            <SheetDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Sheet Component Example"
              description="Here's how to use the Sheet component in your code."
              code={sheetExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Aspect Ratio Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Aspect Ratio</CardTitle>
            <CardDescription>Maintain aspect ratio for content.</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatioDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Aspect Ratio Component Example"
              description="Here's how to use the Aspect Ratio component in your code."
              code={aspectRatioExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Combobox Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Combobox</CardTitle>
            <CardDescription>Combobox with search and selection.</CardDescription>
          </CardHeader>
          <CardContent>
            <ComboboxDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Combobox Component Example"
              description="Here's how to use the Combobox component in your code."
              code={comboboxExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Dropdown Menu Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Dropdown menu with items.</CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenuDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Dropdown Menu Component Example"
              description="Here's how to use the Dropdown Menu component in your code."
              code={dropdownMenuExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Toast Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Toast</CardTitle>
            <CardDescription>Toast notification system.</CardDescription>
          </CardHeader>
          <CardContent>
            <ToastDemo />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Toast Component Example"
              description="Here's how to use the Toast component in your code."
              code={toastExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Input OTP Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Input OTP</CardTitle>
            <CardDescription>One-time password input fields.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Default OTP Input</h4>
                <InputOTPDemo />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">OTP Input with Pattern</h4>
                <InputOTPDemoTwo />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Input OTP Component Example"
              description="Here's how to use the Input OTP component in your code."
              code={inputOTPExampleCode}
            />
          </CardFooter>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Form</CardTitle>
            <CardDescription>Form with validation and various input types.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormExample />
          </CardContent>
          <CardFooter>
            <CodeExampleDialog
              title="Form Component Example"
              description="Here's how to use the Form component in your code."
              code={formExampleCode}
            />
          </CardFooter>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}
