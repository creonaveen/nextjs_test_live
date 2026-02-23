module.exports=[90067,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)(e.Accordion,{type:"single",collapsible:!0,className:"w-full",children:[(0,d.jsxs)(e.AccordionItem,{value:"item-1",children:[(0,d.jsx)(e.AccordionTrigger,{children:"Is it accessible?"}),(0,d.jsx)(e.AccordionContent,{children:"Yes. It adheres to the WAI-ARIA design pattern."})]}),(0,d.jsxs)(e.AccordionItem,{value:"item-2",children:[(0,d.jsx)(e.AccordionTrigger,{children:"Is it styled?"}),(0,d.jsx)(e.AccordionContent,{children:"Yes. It comes with default styles that matches the other components' aesthetic."})]}),(0,d.jsxs)(e.AccordionItem,{value:"item-3",children:[(0,d.jsx)(e.AccordionTrigger,{children:"Is it animated?"}),(0,d.jsx)(e.AccordionContent,{children:"Yes. It's animated by default, but you can disable it if you prefer."})]})]})}[e]=f.then?(await f)():f;let h=`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/external-components/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`;a.s(["AccordionDemo",()=>g,"accordionExampleCode",0,h]),c()}catch(a){c(a)}},!1),90351,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)(e.Alert,{children:[(0,d.jsx)(e.AlertTitle,{children:"Heads up!"}),(0,d.jsx)(e.AlertDescription,{children:"You can add components to your app using the cli."})]})}[e]=f.then?(await f)():f;let h=`import { Alert, AlertDescription, AlertTitle } from "@/components/external-components/alert"

// Basic Alert
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the cli.</AlertDescription>
</Alert>

// Destructive Alert
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>

// Success Alert
<Alert className="bg-green-50 text-green-800 border-green-200">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>`;a.s(["AlertDemo",()=>g,"alertExampleCode",0,h]),c()}catch(a){c(a)}},!1),76304,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Sizes"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsxs)(e.Avatar,{className:"h-6 w-6",children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,d.jsx)(e.AvatarFallback,{children:"CN"})]}),(0,d.jsxs)(e.Avatar,{className:"h-8 w-8",children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,d.jsx)(e.AvatarFallback,{children:"CN"})]}),(0,d.jsxs)(e.Avatar,{className:"h-10 w-10",children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,d.jsx)(e.AvatarFallback,{children:"CN"})]}),(0,d.jsxs)(e.Avatar,{className:"h-12 w-12",children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,d.jsx)(e.AvatarFallback,{children:"CN"})]}),(0,d.jsxs)(e.Avatar,{className:"h-14 w-14",children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,d.jsx)(e.AvatarFallback,{children:"CN"})]})]})]})}function h(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Fallback"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"broken-image.jpg",alt:"@user"}),(0,d.jsx)(e.AvatarFallback,{children:"JD"})]}),(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"broken-image.jpg",alt:"@user"}),(0,d.jsx)(e.AvatarFallback,{children:"AB"})]}),(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"broken-image.jpg",alt:"@user"}),(0,d.jsx)(e.AvatarFallback,{children:"CD"})]})]})]})}function i(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Image"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,d.jsx)(e.AvatarFallback,{children:"CN"})]}),(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/vercel.png",alt:"@vercel"}),(0,d.jsx)(e.AvatarFallback,{children:"VC"})]}),(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/nextjs.png",alt:"@nextjs"}),(0,d.jsx)(e.AvatarFallback,{children:"NX"})]})]})]})}function j(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Status"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsxs)("div",{className:"relative",children:[(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,d.jsx)(e.AvatarFallback,{children:"CN"})]}),(0,d.jsx)("span",{className:"ring-background absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500 ring-2"})]}),(0,d.jsxs)("div",{className:"relative",children:[(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/vercel.png",alt:"@vercel"}),(0,d.jsx)(e.AvatarFallback,{children:"VC"})]}),(0,d.jsx)("span",{className:"ring-background absolute right-0 bottom-0 h-3 w-3 rounded-full bg-yellow-500 ring-2"})]}),(0,d.jsxs)("div",{className:"relative",children:[(0,d.jsxs)(e.Avatar,{children:[(0,d.jsx)(e.AvatarImage,{src:"https://github.com/nextjs.png",alt:"@nextjs"}),(0,d.jsx)(e.AvatarFallback,{children:"NX"})]}),(0,d.jsx)("span",{className:"ring-background absolute right-0 bottom-0 h-3 w-3 rounded-full bg-red-500 ring-2"})]})]})]})}function k(){return(0,d.jsxs)("div",{className:"space-y-8",children:[(0,d.jsx)(g,{}),(0,d.jsx)(h,{}),(0,d.jsx)(i,{}),(0,d.jsx)(j,{})]})}[e]=f.then?(await f)():f;let l=`import { Avatar, AvatarFallback, AvatarImage } from "@/components/external-components/avatar"

export function AvatarDemo() {
  return (
    <div className="space-y-8">
      {/* Basic Avatars */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Basic Avatars</h4>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* With Image */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Image</h4>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* With Status */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Status</h4>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-yellow-500 rounded-full ring-2 ring-background" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
              <AvatarFallback>NX</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-red-500 rounded-full ring-2 ring-background" />
          </div>
        </div>
      </div>
    </div>
  )
}`;a.s(["AvatarDemo",()=>k,"avatarExampleCode",0,l]),c()}catch(a){c(a)}},!1),39376,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=a.i(33441),g=a.i(33508),h=b([e]);function i(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Basic Variants"}),(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,d.jsx)(e.Badge,{children:"Default"}),(0,d.jsx)(e.Badge,{variant:"primary",children:"Primary"}),(0,d.jsx)(e.Badge,{variant:"inverted",children:"Inverted"}),(0,d.jsx)(e.Badge,{variant:"success",children:"Success"}),(0,d.jsx)(e.Badge,{variant:"error",children:"Error"}),(0,d.jsx)(e.Badge,{variant:"warning",children:"Warning"})]})]})}function j(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Icons"}),(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,d.jsxs)(e.Badge,{className:"gap-1",children:[(0,d.jsx)(f.Check,{className:"h-3 w-3"}),"Active"]}),(0,d.jsxs)(e.Badge,{variant:"error",className:"gap-1",children:[(0,d.jsx)(g.X,{className:"h-3 w-3"}),"Inactive"]}),(0,d.jsxs)(e.Badge,{variant:"inverted",className:"gap-1",children:[(0,d.jsx)(f.Check,{className:"h-3 w-3"}),"Verified"]})]})]})}function k(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Custom Colors"}),(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,d.jsx)(e.Badge,{className:"bg-blue-500 hover:bg-blue-600",children:"Blue"}),(0,d.jsx)(e.Badge,{className:"bg-green-500 hover:bg-green-600",children:"Green"}),(0,d.jsx)(e.Badge,{className:"bg-purple-500 hover:bg-purple-600",children:"Purple"}),(0,d.jsx)(e.Badge,{className:"bg-yellow-500 hover:bg-yellow-600",children:"Yellow"})]})]})}function l(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Status Badges"}),(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,d.jsx)(e.Badge,{className:"bg-green-500 hover:bg-green-600",children:"Online"}),(0,d.jsx)(e.Badge,{className:"bg-yellow-500 hover:bg-yellow-600",children:"Away"}),(0,d.jsx)(e.Badge,{className:"bg-red-500 hover:bg-red-600",children:"Offline"}),(0,d.jsx)(e.Badge,{className:"bg-gray-500 hover:bg-gray-600",children:"Busy"})]})]})}function m(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Interactive Badges"}),(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,d.jsx)(e.Badge,{className:"hover:bg-primary/80 cursor-pointer",children:"Clickable"}),(0,d.jsx)(e.Badge,{variant:"inverted",className:"hover:bg-secondary/80 cursor-pointer",children:"Interactive"}),(0,d.jsx)(e.Badge,{variant:"primary",className:"hover:bg-primary/10 cursor-pointer",children:"Hover Me"})]})]})}function n(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Count"}),(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,d.jsx)(e.Badge,{children:"5"}),(0,d.jsx)(e.Badge,{variant:"success",children:"12"}),(0,d.jsx)(e.Badge,{variant:"error",children:"3"}),(0,d.jsx)(e.Badge,{variant:"warning",children:"99+"})]})]})}function o(){return(0,d.jsxs)("div",{className:"space-y-8",children:[(0,d.jsx)(i,{}),(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),(0,d.jsx)(l,{}),(0,d.jsx)(m,{}),(0,d.jsx)(n,{})]})}[e]=h.then?(await h)():h;let p=`import { Badge } from "@/components/external-components/badge"
import { Check, X } from "lucide-react"

// Basic Variants
<div className="flex flex-wrap items-center gap-2">
  <Badge>Default</Badge>
  <Badge variant="inverted">Secondary</Badge>
  <Badge variant="error">Destructive</Badge>
  <Badge variant="warning">Outline</Badge>
</div>

// With Icons
<div className="flex flex-wrap items-center gap-2">
  <Badge className="gap-1">
    <Check className="h-3 w-3" />
    Active
  </Badge>
  <Badge variant="error" className="gap-1">
    <X className="h-3 w-3" />
    Inactive
  </Badge>
  <Badge variant="inverted" className="gap-1">
    <Check className="h-3 w-3" />
    Verified
  </Badge>
</div>

// Custom Colors
<div className="flex flex-wrap items-center gap-2">
  <Badge className="bg-blue-500 hover:bg-blue-600">Blue</Badge>
  <Badge className="bg-green-500 hover:bg-green-600">Green</Badge>
  <Badge className="bg-purple-500 hover:bg-purple-600">Purple</Badge>
  <Badge className="bg-yellow-500 hover:bg-yellow-600">Yellow</Badge>
</div>`;a.s(["BadgeDemo",()=>o,"badgeExampleCode",0,p]),c()}catch(a){c(a)}},!1),73479,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsx)(e.Breadcrumb,{children:(0,d.jsxs)(e.BreadcrumbList,{children:[(0,d.jsx)(e.BreadcrumbItem,{children:(0,d.jsx)(e.BreadcrumbLink,{href:"/",children:"Home"})}),(0,d.jsx)(e.BreadcrumbSeparator,{}),(0,d.jsx)(e.BreadcrumbItem,{children:(0,d.jsx)(e.BreadcrumbLink,{href:"/components",children:"Components"})}),(0,d.jsx)(e.BreadcrumbSeparator,{}),(0,d.jsx)(e.BreadcrumbItem,{children:(0,d.jsx)(e.BreadcrumbPage,{children:"Breadcrumb"})})]})})}[e]=f.then?(await f)():f;let h=`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/external-components/breadcrumb"

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`;a.s(["BreadcrumbDemo",()=>g,"breadcrumbExampleCode",0,h]),c()}catch(a){c(a)}},!1),44153,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-4",children:[(0,d.jsx)(e.Button,{size:"sm",children:"Small"}),(0,d.jsx)(e.Button,{children:"Default"}),(0,d.jsx)(e.Button,{size:"lg",children:"Large"})]})}function h(){return(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-4",children:[(0,d.jsx)(e.Button,{variant:"secondary",size:"sm",children:"Small"}),(0,d.jsx)(e.Button,{variant:"secondary",children:"Default"}),(0,d.jsx)(e.Button,{variant:"secondary",size:"lg",children:"Large"})]})}function i(){return(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-4",children:[(0,d.jsx)(e.Button,{variant:"destructive",size:"sm",children:"Small"}),(0,d.jsx)(e.Button,{variant:"destructive",children:"Default"}),(0,d.jsx)(e.Button,{variant:"destructive",size:"lg",children:"Large"})]})}function j(){return(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-4",children:[(0,d.jsx)(e.Button,{variant:"outline",size:"sm",children:"Small"}),(0,d.jsx)(e.Button,{variant:"outline",children:"Default"}),(0,d.jsx)(e.Button,{variant:"outline",size:"lg",children:"Large"})]})}function k(){return(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-4",children:[(0,d.jsx)(e.Button,{variant:"ghost",size:"sm",children:"Small"}),(0,d.jsx)(e.Button,{variant:"ghost",children:"Default"}),(0,d.jsx)(e.Button,{variant:"ghost",size:"lg",children:"Large"})]})}function l(){return(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-4",children:[(0,d.jsx)(e.Button,{variant:"link",size:"sm",children:"Small"}),(0,d.jsx)(e.Button,{variant:"link",children:"Default"}),(0,d.jsx)(e.Button,{variant:"link",size:"lg",children:"Large"})]})}function m(){return(0,d.jsxs)("div",{className:"space-y-8",children:[(0,d.jsx)(g,{}),(0,d.jsx)(h,{}),(0,d.jsx)(i,{}),(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),(0,d.jsx)(l,{})]})}[e]=f.then?(await f)():f;let n=`import { Button } from "@/components/external-components/button"

// Default variant with sizes
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>

// Secondary variant with sizes
<Button variant="secondary" size="sm">Small</Button>
<Button variant="secondary">Default</Button>
<Button variant="secondary" size="lg">Large</Button>

// Destructive variant with sizes
<Button variant="destructive" size="sm">Small</Button>
<Button variant="destructive">Default</Button>
<Button variant="destructive" size="lg">Large</Button>

// Outline variant with sizes
<Button variant="outline" size="sm">Small</Button>
<Button variant="outline">Default</Button>
<Button variant="outline" size="lg">Large</Button>

// Ghost variant with sizes
<Button variant="ghost" size="sm">Small</Button>
<Button variant="ghost">Default</Button>
<Button variant="ghost" size="lg">Large</Button>

// Link variant with sizes
<Button variant="link" size="sm">Small</Button>
<Button variant="link">Default</Button>
<Button variant="link" size="lg">Large</Button>`;a.s(["ButtonDemo",()=>m,"buttonExampleCode",0,n]),c()}catch(a){c(a)}},!1),16666,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=a.i(17853),g=b([e]);function h(){return(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Small Card"}),(0,d.jsxs)(f.Card,{className:"w-[250px]",children:[(0,d.jsxs)(f.CardHeader,{children:[(0,d.jsx)(f.CardTitle,{children:"Small Card"}),(0,d.jsx)(f.CardDescription,{children:"A compact card example."})]}),(0,d.jsx)(f.CardContent,{children:(0,d.jsx)("p",{className:"text-sm",children:"This is a small card with minimal content."})}),(0,d.jsx)(f.CardFooter,{children:(0,d.jsx)(e.Button,{size:"sm",children:"Action"})})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Default Card"}),(0,d.jsxs)(f.Card,{className:"w-[350px]",children:[(0,d.jsxs)(f.CardHeader,{children:[(0,d.jsx)(f.CardTitle,{children:"Default Card"}),(0,d.jsx)(f.CardDescription,{children:"Standard card with more content."})]}),(0,d.jsxs)(f.CardContent,{children:[(0,d.jsx)("p",{children:"This is a default sized card with more detailed content and a form."}),(0,d.jsx)("form",{className:"mt-4",children:(0,d.jsx)("div",{className:"grid w-full items-center gap-4",children:(0,d.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"name",children:"Name"}),(0,d.jsx)(e.Input,{id:"name",placeholder:"Enter your name"})]})})})]}),(0,d.jsxs)(f.CardFooter,{className:"flex justify-between",children:[(0,d.jsx)(e.Button,{variant:"outline",children:"Cancel"}),(0,d.jsx)(e.Button,{children:"Submit"})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Large Card"}),(0,d.jsxs)(f.Card,{className:"w-[450px]",children:[(0,d.jsxs)(f.CardHeader,{children:[(0,d.jsx)(f.CardTitle,{children:"Large Card"}),(0,d.jsx)(f.CardDescription,{children:"A spacious card with rich content."})]}),(0,d.jsx)(f.CardContent,{children:(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsx)("p",{children:"This is a large card that can accommodate more complex content and multiple sections."}),(0,d.jsxs)("div",{className:"rounded-lg border p-4",children:[(0,d.jsx)("h4",{className:"font-medium",children:"Section 1"}),(0,d.jsx)("p",{className:"text-grey-700 dark:text-grey-200 text-sm",children:"Additional information goes here."})]}),(0,d.jsxs)("div",{className:"rounded-lg border p-4",children:[(0,d.jsx)("h4",{className:"font-medium",children:"Section 2"}),(0,d.jsx)("p",{className:"text-grey-700 dark:text-grey-200 text-sm",children:"More content can be added here."})]})]})}),(0,d.jsxs)(f.CardFooter,{className:"flex justify-between",children:[(0,d.jsx)(e.Button,{variant:"outline",size:"lg",children:"Cancel"}),(0,d.jsx)(e.Button,{size:"lg",children:"Submit"})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Interactive Card"}),(0,d.jsxs)(f.Card,{className:"w-[350px] transition-shadow hover:shadow-lg",children:[(0,d.jsxs)(f.CardHeader,{children:[(0,d.jsx)(f.CardTitle,{children:"Interactive Card"}),(0,d.jsx)(f.CardDescription,{children:"Hover over this card to see the effect."})]}),(0,d.jsx)(f.CardContent,{children:(0,d.jsx)("p",{children:"This card has hover effects and interactive elements."})}),(0,d.jsxs)(f.CardFooter,{className:"flex justify-between",children:[(0,d.jsx)(e.Button,{variant:"ghost",children:"Learn More"}),(0,d.jsx)(e.Button,{children:"Get Started"})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Split Header Card"}),(0,d.jsxs)(f.Card,{className:"w-[400px]",children:[(0,d.jsxs)(f.CardHeader,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(f.CardTitle,{children:"Analytics Overview"}),(0,d.jsx)(f.CardDescription,{children:"Monthly performance metrics"})]}),(0,d.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,d.jsx)(e.Button,{variant:"outline",size:"sm",children:"Export"}),(0,d.jsx)(e.Button,{size:"sm",children:"Refresh"})]})]}),(0,d.jsx)(f.CardContent,{children:(0,d.jsx)("div",{className:"space-y-4",children:(0,d.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,d.jsxs)("div",{className:"rounded-lg border p-3",children:[(0,d.jsx)("p",{className:"text-sm font-medium",children:"Total Users"}),(0,d.jsx)("p",{className:"text-2xl font-bold",children:"1,234"}),(0,d.jsx)("p",{className:"text-xs text-green-500",children:"+12% from last month"})]}),(0,d.jsxs)("div",{className:"rounded-lg border p-3",children:[(0,d.jsx)("p",{className:"text-sm font-medium",children:"Revenue"}),(0,d.jsx)("p",{className:"text-2xl font-bold",children:"$12,345"}),(0,d.jsx)("p",{className:"text-xs text-green-500",children:"+8% from last month"})]})]})})})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Detailed Info Card"}),(0,d.jsxs)(f.Card,{className:"w-[450px]",children:[(0,d.jsxs)(f.CardHeader,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(f.CardTitle,{children:"Project Details"}),(0,d.jsx)(f.CardDescription,{children:"Complete project information"})]}),(0,d.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,d.jsx)(e.Button,{variant:"ghost",size:"sm",children:"Edit"}),(0,d.jsx)(e.Button,{variant:"ghost",size:"sm",children:"Share"})]})]}),(0,d.jsx)(f.CardContent,{children:(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"text-sm font-medium",children:"Status"}),(0,d.jsx)("p",{className:"text-sm text-green-500",children:"In Progress"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"text-sm font-medium",children:"Due Date"}),(0,d.jsx)("p",{className:"text-sm",children:"Dec 31, 2024"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"text-sm font-medium",children:"Priority"}),(0,d.jsx)("p",{className:"text-sm text-orange-500",children:"High"})]})]}),(0,d.jsxs)("div",{className:"rounded-lg border p-4",children:[(0,d.jsx)("h4",{className:"mb-2 font-medium",children:"Description"}),(0,d.jsx)("p",{className:"text-grey-700 dark:text-grey-200 text-sm",children:"This project involves developing a new feature set for the platform, including user authentication, data visualization, and real-time updates."})]}),(0,d.jsxs)("div",{className:"rounded-lg border p-4",children:[(0,d.jsx)("h4",{className:"mb-2 font-medium",children:"Team Members"}),(0,d.jsxs)("div",{className:"flex space-x-2",children:[(0,d.jsx)("div",{className:"bg-primary/10 rounded-full px-3 py-1 text-xs",children:"John Doe"}),(0,d.jsx)("div",{className:"bg-primary/10 rounded-full px-3 py-1 text-xs",children:"Jane Smith"}),(0,d.jsx)("div",{className:"bg-primary/10 rounded-full px-3 py-1 text-xs",children:"+3 more"})]})]})]})}),(0,d.jsxs)(f.CardFooter,{className:"flex justify-between",children:[(0,d.jsx)(e.Button,{variant:"outline",children:"View Timeline"}),(0,d.jsx)(e.Button,{children:"Update Progress"})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Notification Card"}),(0,d.jsxs)(f.Card,{className:"w-[400px]",children:[(0,d.jsxs)(f.CardHeader,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(f.CardTitle,{children:"System Notifications"}),(0,d.jsx)(f.CardDescription,{children:"Recent updates and alerts"})]}),(0,d.jsx)(e.Button,{variant:"ghost",size:"sm",children:"Mark all read"})]}),(0,d.jsx)(f.CardContent,{children:(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"flex items-start space-x-4 rounded-lg border p-3",children:[(0,d.jsx)("div",{className:"rounded-full bg-blue-100 p-2",children:(0,d.jsx)("svg",{className:"h-4 w-4 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"font-medium",children:"System Update Available"}),(0,d.jsx)("p",{className:"text-grey-700 dark:text-grey-200 text-sm",children:"A new version is ready to install"}),(0,d.jsx)("p",{className:"text-grey-700 dark:text-grey-200 text-xs",children:"2 hours ago"})]})]}),(0,d.jsxs)("div",{className:"flex items-start space-x-4 rounded-lg border p-3",children:[(0,d.jsx)("div",{className:"rounded-full bg-green-100 p-2",children:(0,d.jsx)("svg",{className:"h-4 w-4 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"font-medium",children:"Backup Completed"}),(0,d.jsx)("p",{className:"text-grey-700 dark:text-grey-200 text-sm",children:"System backup was successful"}),(0,d.jsx)("p",{className:"text-grey-700 dark:text-grey-200 text-xs",children:"5 hours ago"})]})]})]})}),(0,d.jsx)(f.CardFooter,{children:(0,d.jsx)(e.Button,{variant:"outline",className:"w-full",children:"View All Notifications"})})]})]})]})}[e]=g.then?(await g)():g;let i=`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/external-components/card"
import { Button } from "@/components/external-components/button"
import { Label } from "@/components/external-components/label"
import { Input } from "@/components/external-components/input"

export function CardDemo() {
  return (
    <div className="space-y-4">
      {/* Small Card */}
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>A compact card example.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">This is a small card with minimal content.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>

      {/* Default Card */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card with more content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a default sized card with more detailed content and a form.</p>
          <form className="mt-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>

      {/* Large Card */}
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>A spacious card with rich content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>This is a large card that can accommodate more complex content and multiple sections.</p>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Section 1</h4>
              <p className="text-sm text-grey-700 dark:text-grey-200">Additional information goes here.</p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Section 2</h4>
              <p className="text-sm text-grey-700 dark:text-grey-200">More content can be added here.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="lg">Cancel</Button>
          <Button size="lg">Submit</Button>
        </CardFooter>
      </Card>

      {/* Interactive Card */}
      <Card className="w-[350px] transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover over this card to see the effect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has hover effects and interactive elements.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Learn More</Button>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>

      {/* Split Header Card */}
      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Monthly performance metrics</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button size="sm">Refresh</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Revenue</p>
                <p className="text-2xl font-bold">$12,345</p>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Info Card */}
      <Card className="w-[450px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Complete project information</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">Share</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm text-green-500">In Progress</p>
              </div>
              <div>
                <p className="text-sm font-medium">Due Date</p>
                <p className="text-sm">Dec 31, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium">Priority</p>
                <p className="text-sm text-orange-500">High</p>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-grey-700 dark:text-grey-200">
                This project involves developing a new feature set for the platform, including
                user authentication, data visualization, and real-time updates.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Team Members</h4>
              <div className="flex space-x-2">
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs">John Doe</div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs">Jane Smith</div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs">+3 more</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Timeline</Button>
          <Button>Update Progress</Button>
        </CardFooter>
      </Card>

      {/* Notification Card */}
      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Recent updates and alerts</CardDescription>
          </div>
          <Button variant="ghost" size="sm">Mark all read</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 rounded-lg border p-3">
              <div className="rounded-full bg-blue-100 p-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">System Update Available</p>
                <p className="text-sm text-grey-700 dark:text-grey-200">A new version is ready to install</p>
                <p className="text-xs text-grey-700 dark:text-grey-200">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 rounded-lg border p-3">
              <div className="rounded-full bg-green-100 p-2">
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Backup Completed</p>
                <p className="text-sm text-grey-700 dark:text-grey-200">System backup was successful</p>
                <p className="text-xs text-grey-700 dark:text-grey-200">5 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Notifications</Button>
        </CardFooter>
      </Card>
    </div>
  )
}`;a.s(["CardDemo",()=>h,"cardExampleCode",0,i]),c()}catch(a){c(a)}},!1),26862,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,d.jsx)(e.Checkbox,{id:"terms"}),(0,d.jsx)(e.Label,{htmlFor:"terms",children:"Accept terms and conditions"})]})}[e]=f.then?(await f)():f;let h=`import { Checkbox } from "investtech/external-components"
import { Label } from "@/components/external-components"

// Basic checkbox with label
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Disabled checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled">Disabled Checkbox</Label>
</div>

// Checkbox with custom colors
<div className="flex items-center space-x-2">
  <Checkbox id="custom" className="data-[state=checked]:bg-green-500" />
  <Label htmlFor="custom">Custom Color Checkbox</Label>
</div>

// Checkbox with description
<div className="flex items-start space-x-2">
  <Checkbox id="description" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="description">Enable notifications</Label>
    <p className="text-grey-700 dark:text-grey-200 text-sm">Receive notifications about new messages.</p>
  </div>
</div>`;a.s(["CheckboxDemo",()=>g,"checkboxExampleCode",0,h]),c()}catch(a){c(a)}},!1),37539,a=>{"use strict";let b=(0,a.i(70106).default)("chevrons-up-down",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);a.s(["ChevronsUpDown",()=>b],37539)},41261,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=a.i(33441),g=a.i(37539),h=a.i(72131),i=a.i(88782),j=b([e]);[e]=j.then?(await j)():j;let l=[{value:"next.js",label:"Next.js"},{value:"sveltekit",label:"SvelteKit"},{value:"nuxt.js",label:"Nuxt.js"},{value:"remix",label:"Remix"},{value:"astro",label:"Astro"}];function k(){let[a,b]=h.useState(!1),[c,j]=h.useState("");return(0,d.jsxs)(e.Popover,{open:a,onOpenChange:b,children:[(0,d.jsx)(e.PopoverTrigger,{asChild:!0,children:(0,d.jsxs)(e.Button,{variant:"outline",role:"combobox","aria-expanded":a,className:"w-[200px] justify-between",children:[c?l.find(a=>a.value===c)?.label:"Select framework...",(0,d.jsx)(g.ChevronsUpDown,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),(0,d.jsx)(e.PopoverContent,{className:"w-[200px] p-0",children:(0,d.jsxs)(e.Command,{children:[(0,d.jsx)(e.CommandInput,{placeholder:"Search framework..."}),(0,d.jsx)(e.CommandEmpty,{children:"No framework found."}),(0,d.jsx)(e.CommandGroup,{children:l.map(a=>(0,d.jsxs)(e.CommandItem,{value:a.value,onSelect:a=>{j(a===c?"":a),b(!1)},children:[(0,d.jsx)(f.Check,{className:(0,i.cn)("mr-2 h-4 w-4",c===a.value?"opacity-100":"opacity-0")}),a.label]},a.value))})]})})]})}let m=`import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/external-components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/external-components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/external-components/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}`;a.s(["ComboboxDemo",()=>k,"comboboxExampleCode",0,m]),c()}catch(a){c(a)}},!1),41675,a=>{"use strict";let b=(0,a.i(70106).default)("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);a.s(["Calendar",()=>b],41675)},30617,a=>{"use strict";let b=(0,a.i(70106).default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);a.s(["LayoutDashboard",()=>b],30617)},46842,a=>{"use strict";let b=(0,a.i(70106).default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);a.s(["User",()=>b],46842)},2710,a=>{"use strict";let b=(0,a.i(70106).default)("chart-no-axes-column-increasing",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]);a.s(["BarChart",()=>b],2710)},4720,a=>{"use strict";let b=(0,a.i(70106).default)("file-text",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);a.s(["FileText",()=>b],4720)},73237,a=>{"use strict";let b=(0,a.i(70106).default)("calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);a.s(["Calculator",()=>b],73237)},8501,a=>{"use strict";let b=(0,a.i(70106).default)("sticky-note",[["path",{d:"M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",key:"qazsjp"}],["path",{d:"M15 3v4a2 2 0 0 0 2 2h4",key:"40519r"}]]);a.s(["StickyNote",()=>b],8501)},87534,a=>{"use strict";let b=(0,a.i(70106).default)("square-check-big",[["path",{d:"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",key:"2acyp4"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);a.s(["CheckSquare",()=>b],87534)},14753,a=>{"use strict";let b=(0,a.i(70106).default)("timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);a.s(["Timer",()=>b],14753)},69836,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=a.i(41675),g=a.i(87532),h=a.i(21161),i=a.i(30617),j=a.i(46842),k=a.i(2710),l=a.i(4720),m=a.i(73237),n=a.i(8501),o=a.i(87534),p=a.i(14753),q=a.i(72131),r=b([e]);[e]=r.then?(await r)():r;let t=[{id:"calendar",title:"Calendar",description:"View your schedule",icon:f.Calendar,group:"Suggestions"},{id:"search",title:"Search",description:"Find anything",icon:g.Search,group:"Suggestions"},{id:"settings",title:"Settings",description:"Configure app",icon:h.Settings,group:"Suggestions"},{id:"dashboard",title:"Dashboard",description:"Overview",icon:i.LayoutDashboard,group:"Navigation"},{id:"profile",title:"Profile",description:"Your account",icon:j.User,group:"Navigation"},{id:"analytics",title:"Analytics",description:"View statistics",icon:k.BarChart,group:"Navigation"},{id:"reports",title:"Reports",description:"Generate reports",icon:l.FileText,group:"Navigation"},{id:"calculator",title:"Calculator",description:"Quick calculations",icon:m.Calculator,group:"Tools"},{id:"notes",title:"Notes",description:"Take notes",icon:n.StickyNote,group:"Tools"},{id:"tasks",title:"Tasks",description:"Manage tasks",icon:o.CheckSquare,group:"Tools"},{id:"timer",title:"Timer",description:"Track time",icon:p.Timer,group:"Tools"}];function s(){let[a,b]=(0,q.useState)(!1),[c,f]=(0,q.useState)("");(0,q.useEffect)(()=>{let c=a=>{"Escape"===a.key&&b(!1)};if(a)return document.addEventListener("keydown",c),()=>{document.removeEventListener("keydown",c)}},[a]);let g=t.filter(a=>{let b=c.toLowerCase();return a.title.toLowerCase().includes(b)||a.description.toLowerCase().includes(b)||a.group.toLowerCase().includes(b)}).reduce((a,b)=>(a[b.group]||(a[b.group]=[]),a[b.group].push(b),a),{});return(0,d.jsx)("div",{className:"relative",children:(0,d.jsxs)(e.Command,{className:"rounded-lg border shadow-md",children:[(0,d.jsx)(e.CommandInput,{placeholder:"Type a command or search...",onFocus:()=>b(!0),value:c,onValueChange:f,"aria-label":"Search commands"}),a&&(0,d.jsxs)(e.CommandList,{className:"bg-popover text-popover-foreground animate-in fade-in-80 absolute top-full left-0 mt-1 w-full rounded-md border shadow-md",children:[(0,d.jsx)(e.CommandEmpty,{children:"No results found."}),Object.entries(g).map(([a,c])=>(0,d.jsx)(e.CommandGroup,{heading:a,children:c.map(a=>(0,d.jsxs)(e.CommandItem,{onSelect:()=>{b(!1),f(""),console.log("Selected command:",a)},className:"hover:bg-primary-background flex cursor-pointer items-center px-4 py-2 transition-colors hover:text-black dark:hover:text-white","aria-label":`${a.title}: ${a.description}`,children:[(0,d.jsx)(a.icon,{className:"text-primary mr-3 h-5 w-5","aria-hidden":"true"}),(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("span",{className:"font-medium",children:a.title}),(0,d.jsx)("span",{className:"text-grey-700 dark:text-grey-200 text-sm",children:a.description})]})]},a.id))},a))]})]})})}let u=`import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/external-components/command"
import { useState, useEffect } from "react"
import { Calendar, Search, Settings, LayoutDashboard, User, BarChart, FileText, Calculator, StickyNote, CheckSquare, Timer, LucideIcon } from "lucide-react"

interface CommandItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  group: string
}

const commands: CommandItem[] = [
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'View your schedule',
    icon: Calendar,
    group: 'Suggestions'
  },
  {
    id: 'search',
    title: 'Search',
    description: 'Find anything',
    icon: Search,
    group: 'Suggestions'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure app',
    icon: Settings,
    group: 'Suggestions'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview',
    icon: LayoutDashboard,
    group: 'Navigation'
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Your account',
    icon: User,
    group: 'Navigation'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View statistics',
    icon: BarChart,
    group: 'Navigation'
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Generate reports',
    icon: FileText,
    group: 'Navigation'
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'Quick calculations',
    icon: Calculator,
    group: 'Tools'
  },
  {
    id: 'notes',
    title: 'Notes',
    description: 'Take notes',
    icon: StickyNote,
    group: 'Tools'
  },
  {
    id: 'tasks',
    title: 'Tasks',
    description: 'Manage tasks',
    icon: CheckSquare,
    group: 'Tools'
  },
  {
    id: 'timer',
    title: 'Timer',
    description: 'Track time',
    icon: Timer,
    group: 'Tools'
  }
]

export function CommandDemo() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Close when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [open])

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase()
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.group.toLowerCase().includes(searchLower)
    )
  })

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.group]) {
      acc[command.group] = []
    }
    acc[command.group].push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  return (
    <div className="relative">
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Type a command or search..." 
          onFocus={() => setOpen(true)}
          value={search}
          onValueChange={setSearch}
          aria-label="Search commands"
        />
        {open && (
          <CommandList className="absolute top-full left-0 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(groupedCommands).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      setOpen(false)
                      setSearch('')
                      // Handle command selection here
                      console.log('Selected command:', item)
                    }}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-accent-1 hover:text-black dark:hover:text-white transition-colors"
                    aria-label={\`\${item.title}: \${item.description}\`}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-primary" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm text-grey-700 dark:text-grey-200">{item.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  )
}`;a.s(["CommandDemo",()=>s,"commandExampleCode",0,u]),c()}catch(a){c(a)}},!1),79052,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Default Dialog"}),(0,d.jsxs)(e.Dialog,{children:[(0,d.jsx)(e.DialogTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Default Dialog"})}),(0,d.jsxs)(e.DialogContent,{children:[(0,d.jsxs)(e.DialogHeader,{children:[(0,d.jsx)(e.DialogTitle,{children:"Edit profile"}),(0,d.jsx)(e.DialogDescription,{children:"Make changes to your profile here. Click save when you're done."})]}),(0,d.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"name",className:"text-right",children:"Name"}),(0,d.jsx)(e.Input,{id:"name",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"username",className:"text-right",children:"Username"}),(0,d.jsx)(e.Input,{id:"username",className:"col-span-3"})]})]}),(0,d.jsx)(e.DialogFooter,{children:(0,d.jsx)(e.Button,{type:"submit",children:"Save changes"})})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Small Dialog"}),(0,d.jsxs)(e.Dialog,{children:[(0,d.jsx)(e.DialogTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Small Dialog"})}),(0,d.jsxs)(e.DialogContent,{className:"sm:max-w-[300px]",children:[(0,d.jsxs)(e.DialogHeader,{children:[(0,d.jsx)(e.DialogTitle,{children:"Quick Action"}),(0,d.jsx)(e.DialogDescription,{children:"Perform a quick action."})]}),(0,d.jsx)("div",{className:"py-4",children:(0,d.jsx)("p",{className:"text-sm",children:"This is a small dialog for quick actions."})}),(0,d.jsx)(e.DialogFooter,{children:(0,d.jsx)(e.Button,{size:"sm",children:"Confirm"})})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Large Dialog"}),(0,d.jsxs)(e.Dialog,{children:[(0,d.jsx)(e.DialogTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Large Dialog"})}),(0,d.jsxs)(e.DialogContent,{className:"sm:max-w-[600px]",children:[(0,d.jsxs)(e.DialogHeader,{children:[(0,d.jsx)(e.DialogTitle,{children:"Detailed Information"}),(0,d.jsx)(e.DialogDescription,{children:"View and edit detailed information."})]}),(0,d.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"name",className:"text-right",children:"Name"}),(0,d.jsx)(e.Input,{id:"name",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"email",className:"text-right",children:"Email"}),(0,d.jsx)(e.Input,{id:"email",type:"email",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"phone",className:"text-right",children:"Phone"}),(0,d.jsx)(e.Input,{id:"phone",type:"tel",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"address",className:"text-right",children:"Address"}),(0,d.jsx)(e.Input,{id:"address",className:"col-span-3"})]})]}),(0,d.jsxs)(e.DialogFooter,{children:[(0,d.jsx)(e.Button,{variant:"outline",children:"Cancel"}),(0,d.jsx)(e.Button,{children:"Save changes"})]})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Alert Dialog"}),(0,d.jsxs)(e.Dialog,{children:[(0,d.jsx)(e.DialogTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"destructive",children:"Delete Account"})}),(0,d.jsxs)(e.DialogContent,{children:[(0,d.jsxs)(e.DialogHeader,{children:[(0,d.jsx)(e.DialogTitle,{children:"Are you sure?"}),(0,d.jsx)(e.DialogDescription,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]}),(0,d.jsxs)(e.DialogFooter,{children:[(0,d.jsx)(e.Button,{variant:"outline",children:"Cancel"}),(0,d.jsx)(e.Button,{variant:"destructive",children:"Delete Account"})]})]})]})]})]})}[e]=f.then?(await f)():f;let h=`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/external-components/dialog"
import { Button } from "@/components/external-components/button"
import { Label } from "@/components/external-components/label"
import { Input } from "@/components/external-components/input"

export function DialogDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Dialog</h4>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Default Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Dialog</h4>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Small Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[300px]">
            <DialogHeader>
              <DialogTitle>Quick Action</DialogTitle>
              <DialogDescription>Perform a quick action.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm">This is a small dialog for quick actions.</p>
            </div>
            <DialogFooter>
              <Button size="sm">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large Dialog</h4>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Large Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detailed Information</DialogTitle>
              <DialogDescription>View and edit detailed information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}`;a.s(["DialogDemo",()=>g,"dialogExampleCode",0,h]),c()}catch(a){c(a)}},!1),9170,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)(e.Drawer,{children:[(0,d.jsx)(e.DrawerTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Drawer"})}),(0,d.jsxs)(e.DrawerContent,{children:[(0,d.jsxs)(e.DrawerHeader,{children:[(0,d.jsx)(e.DrawerTitle,{children:"Edit profile"}),(0,d.jsx)(e.DrawerDescription,{children:"Make changes to your profile here. Click save when you're done."})]}),(0,d.jsx)("div",{className:"grid gap-4 py-4"}),(0,d.jsxs)(e.DrawerFooter,{children:[(0,d.jsx)(e.Button,{type:"submit",children:"Save changes"}),(0,d.jsx)(e.DrawerClose,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Cancel"})})]})]})]})}[e]=f.then?(await f)():f;let h=`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/external-components/drawer"
import { Button } from "@/components/external-components/button"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 py-4">
          {/* Add your form fields here */}
        </div>
        <DrawerFooter>
          <Button type="submit">Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`;a.s(["DrawerDemo",()=>g,"drawerExampleCode",0,h]),c()}catch(a){c(a)}},!1),60557,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(27736),f=a.i(90887),g=b([f]);function h({onOpenChange:a,...b}){return(0,d.jsx)(e.Root,{"data-slot":"dropdown-menu",onOpenChange:a,...b})}function i(){return(0,d.jsxs)(h,{children:[(0,d.jsx)(f.DropdownMenuTrigger,{asChild:!0,children:(0,d.jsx)(f.Button,{variant:"outline",children:"Open Menu"})}),(0,d.jsxs)(f.DropdownMenuContent,{children:[(0,d.jsx)(f.DropdownMenuLabel,{children:"My Account"}),(0,d.jsx)(f.DropdownMenuSeparator,{}),(0,d.jsx)(f.DropdownMenuItem,{children:"Profile"}),(0,d.jsx)(f.DropdownMenuItem,{children:"Billing"}),(0,d.jsx)(f.DropdownMenuItem,{children:"Team"}),(0,d.jsx)(f.DropdownMenuItem,{children:"Subscription"})]})]})}[f]=g.then?(await g)():g;let j=`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/external-components/dropdown-menu"
import { Button } from "@/components/external-components/button"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`;a.s(["DropdownMenuDemo",()=>i,"dropdownMenuExampleCode",0,j]),c()}catch(a){c(a)}},!1),80013,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)(e.HoverCard,{children:[(0,d.jsx)(e.HoverCardTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"link",children:"@nextjs"})}),(0,d.jsx)(e.HoverCardContent,{className:"w-80",children:(0,d.jsx)("div",{className:"flex justify-between space-x-4",children:(0,d.jsxs)("div",{className:"space-y-1",children:[(0,d.jsx)("h4",{className:"text-sm font-semibold",children:"@nextjs"}),(0,d.jsx)("p",{className:"text-sm",children:"The React Framework – created and maintained by @vercel."}),(0,d.jsx)("div",{className:"flex items-center pt-2",children:(0,d.jsx)("span",{className:"text-grey-700 dark:text-grey-200 text-xs",children:"Joined December 2021"})})]})})})]})}[e]=f.then?(await f)():f;let h=`import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/external-components/hover-card"
import { Button } from "@/components/external-components/button"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div className="flex items-center pt-2">
              <span className="text-grey-700 dark:text-grey-200 text-xs">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`;a.s(["HoverCardDemo",()=>g,"hoverCardExampleCode",0,h]),c()}catch(a){c(a)}},!1),8013,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Default Size"}),(0,d.jsxs)("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"email",children:"Email"}),(0,d.jsx)(e.Input,{type:"email",id:"email",placeholder:"Email"})]})]})}function h(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Small Size"}),(0,d.jsxs)("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"small",children:"Small Input"}),(0,d.jsx)(e.Input,{type:"text",id:"small",placeholder:"Small input",className:"h-8"})]})]})}function i(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Large Size"}),(0,d.jsxs)("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"large",children:"Large Input"}),(0,d.jsx)(e.Input,{type:"text",id:"large",placeholder:"Large input",className:"h-12"})]})]})}function j(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Icon"}),(0,d.jsxs)("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"search",children:"Search"}),(0,d.jsxs)("div",{className:"relative",children:[(0,d.jsx)(e.Input,{type:"search",id:"search",placeholder:"Search...",className:"pl-8"}),(0,d.jsx)("span",{className:"text-grey-700 dark:text-grey-200 absolute top-2.5 left-2",children:"🔍"})]})]})]})}function k(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Disabled State"}),(0,d.jsxs)("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"disabled",children:"Disabled Input"}),(0,d.jsx)(e.Input,{type:"text",id:"disabled",placeholder:"Disabled input",disabled:!0})]})]})}function l(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Error"}),(0,d.jsxs)("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"error",children:"Error Input"}),(0,d.jsx)(e.Input,{type:"text",id:"error",placeholder:"Error input",className:"border-red-500"}),(0,d.jsx)("p",{className:"text-sm text-red-500",children:"This field is required"})]})]})}function m(){return(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsx)(g,{}),(0,d.jsx)(h,{}),(0,d.jsx)(i,{}),(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),(0,d.jsx)(l,{})]})}[e]=f.then?(await f)():f;let n=`import { Input } from "@/components/external-components/input"
import { Label } from "@/components/external-components/label"

// Default input
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>

// Small input
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="small">Small Input</Label>
  <Input type="text" id="small" placeholder="Small input" className="h-8" />
</div>

// Large input
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="large">Large Input</Label>
  <Input type="text" id="large" placeholder="Large input" className="h-12" />
</div>

// With icon
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="search">Search</Label>
  <div className="relative">
    <Input type="search" id="search" placeholder="Search..." className="pl-8" />
    <span className="text-grey-700 dark:text-grey-200 absolute top-2.5 left-2">🔍</span>
  </div>
</div>

// Disabled state
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled">Disabled Input</Label>
  <Input type="text" id="disabled" placeholder="Disabled input" disabled />
</div>

// With error
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="error">Error Input</Label>
  <Input type="text" id="error" placeholder="Error input" className="border-red-500" />
  <p className="text-sm text-red-500">This field is required</p>
</div>`;a.s(["InputDemo",()=>m,"inputExampleCode",0,n]),c()}catch(a){c(a)}},!1),78740,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)(e.Menubar,{children:[(0,d.jsxs)(e.MenubarMenu,{children:[(0,d.jsx)(e.MenubarTrigger,{children:"File"}),(0,d.jsxs)(e.MenubarContent,{children:[(0,d.jsx)(e.MenubarItem,{children:"New Tab"}),(0,d.jsx)(e.MenubarItem,{children:"New Window"}),(0,d.jsx)(e.MenubarItem,{children:"Share"}),(0,d.jsx)(e.MenubarItem,{children:"Print"})]})]}),(0,d.jsxs)(e.MenubarMenu,{children:[(0,d.jsx)(e.MenubarTrigger,{children:"Edit"}),(0,d.jsxs)(e.MenubarContent,{children:[(0,d.jsx)(e.MenubarItem,{children:"Undo"}),(0,d.jsx)(e.MenubarItem,{children:"Redo"}),(0,d.jsx)(e.MenubarItem,{children:"Cut"}),(0,d.jsx)(e.MenubarItem,{children:"Copy"}),(0,d.jsx)(e.MenubarItem,{children:"Paste"})]})]}),(0,d.jsxs)(e.MenubarMenu,{children:[(0,d.jsx)(e.MenubarTrigger,{children:"View"}),(0,d.jsxs)(e.MenubarContent,{children:[(0,d.jsx)(e.MenubarItem,{children:"Zoom In"}),(0,d.jsx)(e.MenubarItem,{children:"Zoom Out"}),(0,d.jsx)(e.MenubarItem,{children:"Toggle Fullscreen"})]})]})]})}[e]=f.then?(await f)():f;let h=`import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/external-components/menubar"

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarItem>Share</MenubarItem>
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
          <MenubarItem>Toggle Fullscreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`;a.s(["MenubarDemo",()=>g,"menubarExampleCode",0,h]),c()}catch(a){c(a)}},!1),23060,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"w-full max-w-md space-y-4",children:[(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsxs)("div",{className:"flex justify-between text-sm",children:[(0,d.jsx)("span",{children:"Progress"}),(0,d.jsx)("span",{children:"33%"})]}),(0,d.jsx)(e.Progress,{value:33,indicatorClassName:"bg-green-700",className:"bg-green-700/20"})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsxs)("div",{className:"flex justify-between text-sm",children:[(0,d.jsx)("span",{children:"Progress"}),(0,d.jsx)("span",{children:"66%"})]}),(0,d.jsx)(e.Progress,{value:66,indicatorClassName:"bg-yellow-400",className:"bg-yellow-400/20"})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsxs)("div",{className:"flex justify-between text-sm",children:[(0,d.jsx)("span",{children:"Progress"}),(0,d.jsx)("span",{children:"100%"})]}),(0,d.jsx)(e.Progress,{value:100,indicatorClassName:"bg-red-700",className:"bg-red-700/20"})]})]})}[e]=f.then?(await f)():f;let h=`import { Progress } from "@/components/external-components/progress"

export function ProgressBarDemo() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>33%</span>
        </div>
        <Progress value={33} indicatorClassName="bg-green-700" className="bg-green-700/20"/>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>66%</span>
        </div>
        <Progress value={66} indicatorClassName="bg-yellow-400" className="bg-yellow-400/20" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>100%</span>
        </div>
        <Progress value={100} indicatorClassName="bg-red-700" className="bg-red-700/20" />
      </div>
    </div>
  )
}`;a.s(["ProgressBarDemo",()=>g,"progressBarExampleCode",0,h]),c()}catch(a){c(a)}},!1),88032,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)(e.RadioGroup,{defaultValue:"comfortable",children:[(0,d.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,d.jsx)(e.RadioGroupItem,{value:"default",id:"r1"}),(0,d.jsx)(e.Label,{htmlFor:"r1",children:"Default"})]}),(0,d.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,d.jsx)(e.RadioGroupItem,{value:"comfortable",id:"r2"}),(0,d.jsx)(e.Label,{htmlFor:"r2",children:"Comfortable"})]}),(0,d.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,d.jsx)(e.RadioGroupItem,{value:"compact",id:"r3"}),(0,d.jsx)(e.Label,{htmlFor:"r3",children:"Compact"})]})]})}[e]=f.then?(await f)():f;let h=`import { RadioGroup, RadioGroupItem } from "investtech/external-components"
import { Label } from "investtech/external-components"

// Basic radio group
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>

// Disabled radio group
<RadioGroup defaultValue="disabled" disabled>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="disabled" id="r4" />
    <Label htmlFor="r4">Disabled</Label>
  </div>
</RadioGroup>

// Radio group with description
<RadioGroup defaultValue="card">
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="card" id="r5" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="r5">Card Payment</Label>
      <p className="text-grey-700 dark:text-grey-200 text-sm">Pay with your credit card.</p>
    </div>
  </div>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="paypal" id="r6" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="r6">PayPal</Label>
      <p className="text-grey-700 dark:text-grey-200 text-sm">Pay with your PayPal account.</p>
    </div>
  </div>
</RadioGroup>`;a.s(["RadioGroupDemo",()=>g,"radioGroupExampleCode",0,h]),c()}catch(a){c(a)}},!1),88882,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=a.i(87532),g=b([e]);function h(){return(0,d.jsxs)("div",{className:"relative w-full max-w-sm",children:[(0,d.jsx)(f.Search,{className:"text-grey-700 dark:text-grey-200 absolute top-2.5 left-2 h-4 w-4"}),(0,d.jsx)(e.Input,{placeholder:"Search...",className:"pl-8"})]})}[e]=g.then?(await g)():g;let i=`import { Input } from "investtech/external-components"
import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-grey-700 dark:text-grey-200" />
      <Input
        placeholder="Search..."
        className="pl-8"
      />
    </div>
  )
}`;a.s(["SearchBarDemo",()=>h,"searchBarExampleCode",0,i]),c()}catch(a){c(a)}},!1),3761,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)(e.Select,{children:[(0,d.jsx)(e.SelectTrigger,{className:"w-[180px]",children:(0,d.jsx)(e.SelectValue,{placeholder:"Select a fruit"})}),(0,d.jsxs)(e.SelectContent,{children:[(0,d.jsx)(e.SelectItem,{value:"apple",children:"Apple"}),(0,d.jsx)(e.SelectItem,{value:"banana",children:"Banana"}),(0,d.jsx)(e.SelectItem,{value:"blueberry",children:"Blueberry"}),(0,d.jsx)(e.SelectItem,{value:"grapes",children:"Grapes"}),(0,d.jsx)(e.SelectItem,{value:"pineapple",children:"Pineapple"})]})]})}[e]=f.then?(await f)():f;let h=`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "investtech/external-components"

// Basic Select
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
    <SelectItem value="pineapple">Pineapple</SelectItem>
  </SelectContent>
</Select>

// Disabled Select
<Select disabled>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>

// Select with Groups
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="potato">Potato</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;a.s(["SelectDemo",()=>g,"selectExampleCode",0,h]),c()}catch(a){c(a)}},!1),78357,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Default Sheet"}),(0,d.jsxs)(e.Sheet,{children:[(0,d.jsx)(e.SheetTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Sheet"})}),(0,d.jsxs)(e.SheetContent,{children:[(0,d.jsxs)(e.SheetHeader,{children:[(0,d.jsx)(e.SheetTitle,{children:"Edit profile"}),(0,d.jsx)(e.SheetDescription,{children:"Make changes to your profile here. Click save when you're done."})]}),(0,d.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"name",className:"text-right",children:"Name"}),(0,d.jsx)(e.Input,{id:"name",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"username",className:"text-right",children:"Username"}),(0,d.jsx)(e.Input,{id:"username",className:"col-span-3"})]})]}),(0,d.jsx)(e.SheetFooter,{children:(0,d.jsx)(e.Button,{type:"submit",children:"Save changes"})})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Small Sheet"}),(0,d.jsxs)(e.Sheet,{children:[(0,d.jsx)(e.SheetTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Small Sheet"})}),(0,d.jsxs)(e.SheetContent,{side:"right",className:"w-[300px]",children:[(0,d.jsxs)(e.SheetHeader,{children:[(0,d.jsx)(e.SheetTitle,{children:"Quick Settings"}),(0,d.jsx)(e.SheetDescription,{children:"Adjust your preferences."})]}),(0,d.jsx)("div",{className:"py-4",children:(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.Label,{htmlFor:"notifications",children:"Notifications"}),(0,d.jsx)(e.Switch,{id:"notifications"})]}),(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.Label,{htmlFor:"dark-mode",children:"Dark Mode"}),(0,d.jsx)(e.Switch,{id:"dark-mode"})]})]})}),(0,d.jsx)(e.SheetFooter,{children:(0,d.jsx)(e.Button,{size:"sm",children:"Save"})})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Large Sheet"}),(0,d.jsxs)(e.Sheet,{children:[(0,d.jsx)(e.SheetTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Large Sheet"})}),(0,d.jsxs)(e.SheetContent,{side:"right",className:"w-[600px]",children:[(0,d.jsxs)(e.SheetHeader,{children:[(0,d.jsx)(e.SheetTitle,{children:"Detailed Settings"}),(0,d.jsx)(e.SheetDescription,{children:"Configure all your application settings."})]}),(0,d.jsx)("div",{className:"grid gap-4 py-4",children:(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"name",className:"text-right",children:"Name"}),(0,d.jsx)(e.Input,{id:"name",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"email",className:"text-right",children:"Email"}),(0,d.jsx)(e.Input,{id:"email",type:"email",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"phone",className:"text-right",children:"Phone"}),(0,d.jsx)(e.Input,{id:"phone",type:"tel",className:"col-span-3"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,d.jsx)(e.Label,{htmlFor:"address",className:"text-right",children:"Address"}),(0,d.jsx)(e.Input,{id:"address",className:"col-span-3"})]})]})}),(0,d.jsxs)(e.SheetFooter,{children:[(0,d.jsx)(e.Button,{variant:"outline",children:"Cancel"}),(0,d.jsx)(e.Button,{children:"Save changes"})]})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Left Side Sheet"}),(0,d.jsxs)(e.Sheet,{children:[(0,d.jsx)(e.SheetTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Left Sheet"})}),(0,d.jsxs)(e.SheetContent,{side:"left",children:[(0,d.jsxs)(e.SheetHeader,{children:[(0,d.jsx)(e.SheetTitle,{children:"Navigation"}),(0,d.jsx)(e.SheetDescription,{children:"Browse through different sections."})]}),(0,d.jsx)("div",{className:"py-4",children:(0,d.jsxs)("nav",{className:"space-y-2",children:[(0,d.jsx)(e.Button,{variant:"ghost",className:"w-full justify-start",children:"Dashboard"}),(0,d.jsx)(e.Button,{variant:"ghost",className:"w-full justify-start",children:"Profile"}),(0,d.jsx)(e.Button,{variant:"ghost",className:"w-full justify-start",children:"Settings"}),(0,d.jsx)(e.Button,{variant:"ghost",className:"w-full justify-start",children:"Help"})]})})]})]})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Bottom Sheet"}),(0,d.jsxs)(e.Sheet,{children:[(0,d.jsx)(e.SheetTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Open Bottom Sheet"})}),(0,d.jsxs)(e.SheetContent,{side:"bottom",className:"h-[400px]",children:[(0,d.jsxs)(e.SheetHeader,{children:[(0,d.jsx)(e.SheetTitle,{children:"Quick Actions"}),(0,d.jsx)(e.SheetDescription,{children:"Perform quick actions from here."})]}),(0,d.jsx)("div",{className:"grid gap-4 py-4",children:(0,d.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,d.jsx)(e.Button,{variant:"outline",className:"h-24",children:(0,d.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,d.jsx)("span",{className:"text-2xl",children:"📝"}),(0,d.jsx)("span",{children:"New Note"})]})}),(0,d.jsx)(e.Button,{variant:"outline",className:"h-24",children:(0,d.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,d.jsx)("span",{className:"text-2xl",children:"📷"}),(0,d.jsx)("span",{children:"Take Photo"})]})}),(0,d.jsx)(e.Button,{variant:"outline",className:"h-24",children:(0,d.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,d.jsx)("span",{className:"text-2xl",children:"📍"}),(0,d.jsx)("span",{children:"Share Location"})]})}),(0,d.jsx)(e.Button,{variant:"outline",className:"h-24",children:(0,d.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,d.jsx)("span",{className:"text-2xl",children:"📊"}),(0,d.jsx)("span",{children:"View Stats"})]})})]})})]})]})]})]})}[e]=f.then?(await f)():f;let h=`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "investtech/external-components"
import { Button } from "investtech/external-components"
import { Label } from "investtech/external-components"
import { Switch } from "investtech/external-components"

export function SheetDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Small Sheet</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Quick Settings</SheetTitle>
              <SheetDescription>Adjust your preferences.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notifications</Label>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button size="sm">Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Left Side Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Left Sheet</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Browse through different sections.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Help
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Bottom Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Bottom Sheet</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[400px]">
            <SheetHeader>
              <SheetTitle>Quick Actions</SheetTitle>
              <SheetDescription>Perform quick actions from here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📝</span>
                    <span>New Note</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📷</span>
                    <span>Take Photo</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <span>Share Location</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📊</span>
                    <span>View Stats</span>
                  </div>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}`;a.s(["SheetDemo",()=>g,"sheetExampleCode",0,h]),c()}catch(a){c(a)}},!1),42574,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Basic Skeleton"}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)(e.Skeleton,{className:"h-4 w-[250px]"}),(0,d.jsx)(e.Skeleton,{className:"h-4 w-[200px]"}),(0,d.jsx)(e.Skeleton,{className:"h-4 w-[300px]"})]})]})}function h(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Card Skeleton"}),(0,d.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,d.jsx)(e.Skeleton,{className:"h-12 w-12 rounded-full"}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)(e.Skeleton,{className:"h-4 w-[250px]"}),(0,d.jsx)(e.Skeleton,{className:"h-4 w-[200px]"})]})]})]})}function i(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Profile Skeleton"}),(0,d.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,d.jsx)(e.Skeleton,{className:"h-12 w-12 rounded-full"}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)(e.Skeleton,{className:"h-4 w-[250px]"}),(0,d.jsx)(e.Skeleton,{className:"h-4 w-[200px]"})]})]})]})}function j(){return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Table Skeleton"}),(0,d.jsx)(e.Table,{children:(0,d.jsx)(e.TableBody,{children:Array.from({length:8}).map((a,b)=>(0,d.jsx)(e.TableRow,{children:Array.from({length:4}).map((a,b)=>(0,d.jsx)(e.TableCell,{className:3===b?"text-left":"",children:(0,d.jsx)("div",{className:`flex items-center ${3===b?"justify-end":"justify-start"}`,children:(0,d.jsx)("div",{className:"bg-accent-1 h-5 w-3/4 max-w-[120px] animate-pulse rounded-md"})})},b))},b))})})]})}function k(){return(0,d.jsxs)("div",{className:"space-y-8",children:[(0,d.jsx)(g,{}),(0,d.jsx)(h,{}),(0,d.jsx)(i,{}),(0,d.jsx)(j,{})]})}[e]=f.then?(await f)():f;let l=`import { Skeleton } from "@/components/external-components/skeleton"

export function SkeletonDemo() {
  return (
    <div className="space-y-8">
      {/* Basic Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Basic Skeleton</h4>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>

      {/* Card Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Card Skeleton</h4>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      {/* Profile Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Profile Skeleton</h4>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Table Skeleton</h4>
        <Table>
          <TableBody>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <TableCell key={colIndex} className={colIndex === 4 - 1 ? 'text-left' : ''}>
                    <div
                      className={\`flex items-center \${colIndex === 4 - 1 ? 'justify-end' : 'justify-start'}\`}
                    >
                      <div className="bg-accent-1 h-5 w-3/4 max-w-[120px] animate-pulse rounded-md" />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`;a.s(["SkeletonDemo",()=>k,"skeletonExampleCode",0,l]),c()}catch(a){c(a)}},!1),75782,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,d.jsx)(e.Switch,{id:"airplane-mode"}),(0,d.jsx)(e.Label,{htmlFor:"airplane-mode",children:"Airplane Mode"})]})}[e]=f.then?(await f)():f;let h=`import { Switch } from "@/components/external-components/switch"
import { Label } from "@/components/external-components/label"

// Basic switch with label
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

// Disabled switch
<div className="flex items-center space-x-2">
  <Switch id="disabled" disabled />
  <Label htmlFor="disabled">Disabled Switch</Label>
</div>

// Switch with custom colors
<div className="flex items-center space-x-2">
  <Switch id="custom" className="data-[state=checked]:bg-green-500" />
  <Label htmlFor="custom">Custom Color Switch</Label>
</div>`;a.s(["SwitchDemo",()=>g,"switchExampleCode",0,h]),c()}catch(a){c(a)}},!1),98787,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);[e]=f.then?(await f)():f;let h=`import { Textarea } from "@/components/external-components/textarea"
import { Label } from "@/components/external-components/label"

export function TextareaExample() {
  return (
    <div className="space-y-4">
      {/* Default Size */}
      <Textarea placeholder="Type your message here." />

      {/* Small Size */}
      <Textarea placeholder="Small textarea" className="min-h-[80px]" />

      {/* Medium Size */}
      <Textarea placeholder="Medium textarea" className="min-h-[120px]" />

      {/* Large Size */}
      <Textarea placeholder="Large textarea" className="min-h-[200px]" />

      {/* Disabled State */}
      <Textarea placeholder="Disabled textarea" disabled />

      {/* With Label */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Your message</Label>
        <Textarea placeholder="Type your message here." id="message" />
      </div>
    </div>
  )
}`;function g(){return(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Default Size"}),(0,d.jsx)(e.Textarea,{placeholder:"Type your message here."})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Small Size"}),(0,d.jsx)(e.Textarea,{placeholder:"Small textarea",className:"min-h-[80px]"})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Medium Size"}),(0,d.jsx)(e.Textarea,{placeholder:"Medium textarea",className:"min-h-[120px]"})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Large Size"}),(0,d.jsx)(e.Textarea,{placeholder:"Large textarea",className:"min-h-[200px]"})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Disabled State"}),(0,d.jsx)(e.Textarea,{placeholder:"Disabled textarea",disabled:!0})]}),(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Label"}),(0,d.jsxs)("div",{className:"grid w-full gap-1.5",children:[(0,d.jsx)(e.Label,{htmlFor:"message",children:"Your message"}),(0,d.jsx)(e.Textarea,{placeholder:"Type your message here.",id:"message"})]})]})]})}a.s(["TextareaDemo",()=>g,"textareaExampleCode",0,h]),c()}catch(a){c(a)}},!1),4e3,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){let{toast:a}=(0,e.useToast)();return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"Default Toast"}),(0,d.jsx)(e.Button,{variant:"outline",onClick:()=>{a({title:"Scheduled: Catch up",description:"Friday, February 10, 2023 at 5:57 PM"})},children:"Show Toast"})]})}function h(){let{toast:a}=(0,e.useToast)();return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Action"}),(0,d.jsx)(e.Button,{variant:"outline",onClick:()=>{a({title:"Uh oh! Something went wrong.",description:"There was a problem with your request.",action:(0,d.jsx)(e.Button,{variant:"outline",children:"Try again"})})},children:"Show Toast with Action"})]})}function i(){let{toast:a}=(0,e.useToast)();return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Description"}),(0,d.jsx)(e.Button,{variant:"outline",onClick:()=>{a({title:"Success!",description:"Your changes have been saved."})},children:"Show Success Toast"})]})}function j(){let{toast:a}=(0,e.useToast)();return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsx)("h4",{className:"text-sm font-medium",children:"With Error"}),(0,d.jsx)(e.Button,{variant:"outline",onClick:()=>{a({title:"Error!",description:"Something went wrong. Please try again."})},children:"Show Error Toast"})]})}function k(){return(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsx)(g,{}),(0,d.jsx)(h,{}),(0,d.jsx)(i,{}),(0,d.jsx)(j,{})]})}[e]=f.then?(await f)():f;let l=`import { useToast } from "@/components/external-components/use-toast"
import { Button } from "@/components/external-components/button"

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Toast</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            })
          }}
        >
          Show Toast
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Action</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <Button variant="outline">Try again</Button>,
            })
          }}
        >
          Show Toast with Action
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Description</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Success!",
              description: "Your changes have been saved.",
            })
          }}
        >
          Show Success Toast
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Error</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Error!",
              description: "Something went wrong. Please try again.",
            })
          }}
        >
          Show Error Toast
        </Button>
      </div>
    </div>
  )
}`;a.s(["ToastDemo",()=>k,"toastExampleCode",0,l]),c()}catch(a){c(a)}},!1),88955,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(90887),f=b([e]);function g(){return(0,d.jsx)(e.TooltipProvider,{children:(0,d.jsxs)(e.Tooltip,{children:[(0,d.jsx)(e.TooltipTrigger,{asChild:!0,children:(0,d.jsx)(e.Button,{variant:"outline",children:"Hover me"})}),(0,d.jsx)(e.TooltipContent,{children:(0,d.jsx)("p",{children:"Add to library"})})]})})}[e]=f.then?(await f)():f;let h=`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/external-components/tooltip"
import { Button } from "@/components/external-components/button"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`;a.s(["TooltipDemo",()=>g,"tooltipExampleCode",0,h]),c()}catch(a){c(a)}},!1),22511,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(72131),f=a.i(3076),g=b([f]);function h(){let[a,b]=e.useState("A"),c=e.useCallback(a=>{b(a),console.log("Selected letter:",a)},[]);return(0,d.jsx)("div",{children:(0,d.jsx)(f.AlphabeticFilter,{selectedLetter:a,onSelect:c,showAll:!0})})}[f]=g.then?(await g)():g;let i=`
'use client';

import * as React from 'react';

import { Button } from '@/components/external-components/button';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Props for the AlphabeticFilter component
 */
interface AlphabeticFilterProps {
  /** Callback function called when a letter is selected */
  onSelect?: (letter?: string) => void;
  /** Currently selected letter */
  selectedLetter?: string;
  /** Whether to show the "All" option */
  showAll?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Alphabetic filter component that displays all letters and optionally an "All" button.
 * Used for filtering content by the first letter.
 *
 * @param props - The component props
 * @returns An alphabetic filter component
 */
export function AlphabeticFilter({
  onSelect = () => {},
  selectedLetter,
  showAll = true,
  className,
}: AlphabeticFilterProps) {
  return (
    <div className={\`flex flex-wrap justify-start gap-1 \${className || ''}\`}>
      {ALPHABETS.map((letter) => (
        <Button
          key={letter}
          size="sm"
          variant={selectedLetter === letter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect?.(letter)}
          aria-label={\`Filter by letter \${letter}\`}
          aria-pressed={selectedLetter === letter}
        >
          {letter}
        </Button>
      ))}

      {showAll && (
        <Button
          key="all"
          size="sm"
          variant={!selectedLetter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect?.(undefined)}
          aria-label="Show all"
          aria-pressed={!selectedLetter}
        >
          All
        </Button>
      )}
    </div>
  );
}
`;a.s(["AlphabeticFilterDemo",()=>h,"alphabeticFilterCode",0,i]),c()}catch(a){c(a)}},!1),5434,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(72131),f=a.i(75250),g=b([f]);function h(){let[a,b]=e.useState({value:"1",label:"Option 1"}),c=e.useCallback(a=>{b(a),console.log("Selected option:",a)},[]);return(0,d.jsx)(f.DropdownMenuComponent,{selectedOption:a,onSelect:c,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"}]})}[f]=g.then?(await g)():g;let i=`
'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/external-components/dropdown-menu';

/**
 * Option type for dropdown menu
 */
interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Props for the DropdownMenuComponent
 */
interface DropdownMenuComponentProps {
  /** Currently selected option */
  selectedOption?: DropdownOption;
  /** Callback function called when an option is selected */
  onSelect: (option: DropdownOption) => void;
  /** Array of options to display */
  options: DropdownOption[];
}

/**
 * Custom dropdown menu component with options.
 * Displays a button that opens a dropdown menu with selectable options.
 *
 * @param props - The component props
 * @returns A dropdown menu component
 */
export function DropdownMenuComponent({
  selectedOption,
  onSelect,
  options,
}: DropdownMenuComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const chevronUp = <ChevronUp size={12} className="mt-0.5" />;
  const chevronDown = <ChevronDown size={12} className="mt-0.5" />;

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm"
          aria-label="Select an option"
          aria-expanded={isOpen}
        >
          {selectedOption?.label || options[0]?.label || 'Select an option'}
          {isOpen ? chevronDown : chevronUp}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {options.length > 0 ? (
          options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={
                selectedOption?.value === option.value ? 'bg-accent-1' : ''
              }
              aria-selected={selectedOption?.value === option.value}
            >
              {option.label}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No options available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
`;a.s(["DropdownMenuComponentDemo",()=>h,"dropdownMenuCode",0,i]),c()}catch(a){c(a)}},!1),23032,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(171),f=b([e]);function g(){return(0,d.jsx)("div",{className:"flex justify-center",children:(0,d.jsx)(e.default,{rawSvgHtml:'<!-- START.Element_FactorDiagram --><div id="factorDiagBody" ><div id="portFactorDiagramDesktop"><svg width="400" height="400"><defs>	<radialGradient id="fillFactorMostlyPositive400" cx="200" cy="200" r="140" gradientUnits="userSpaceOnUse">		<stop offset="0%" style="stop-color:#3fb145;stop-opacity:1"></stop>		<stop offset="100%" style="stop-color:#3fb145;stop-opacity:1"></stop>	</radialGradient></defs><ellipse class="ifgAxisTickCircles" cx="200" cy="200" rx="160" ry="160" style="stroke-width:5" /><ellipse  class="ifgAxisTickCircles" cx="200" cy="200" rx="100" ry="100" style="stroke-width:5" /><line x1="200" y1="200" x2="299" y2="64" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="304" y="56" transform="rotate(396,304,56)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Technical</text><line x1="200" y1="200" x2="101" y2="64" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="96" y="56" transform="rotate(324,96,56)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Quantitative</text><line x1="200" y1="200" x2="40" y2="252" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="31" y="255" transform="rotate(72,31,255)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Insider</text><line x1="200" y1="200" x2="200" y2="368" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="200" y="378" transform="rotate(0,200,378)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Stability</text><line x1="200" y1="200" x2="360" y2="252" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="369" y="255" transform="rotate(-72,369,255)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Fundamental</text><path class="normalArea" d="M327,241 C342,189 314,119 277,94 C240,70 176,90 140,118 C104,146 85,186 97,234 C109,281 154,352 200,354 C246,355 311,293 327,241  Z" style="fill:url(#fillFactorMostlyPositive400);fill-opacity:0.85" /><path id="slice1" class="ifgTooltipSliceOpacityLight Technical901 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-90,200,200)" data-slice="slice1" data-factor="technical" data-tooltip-target="slice1" style="cursor: pointer;"></path><path id="slice2" class="ifgTooltipSliceOpacityLight Quantitative1622 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-162,200,200)" data-slice="slice2" data-factor="quantitative" data-tooltip-target="slice2" style="cursor: pointer;"></path><path id="slice3" class="ifgTooltipSliceOpacityLight Insider2343 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-234,200,200)" data-slice="slice3" data-factor="insider" data-tooltip-target="slice3" style="cursor: pointer;"></path><path id="slice4" class="ifgTooltipSliceOpacityLight Stability3064 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-306,200,200)" data-slice="slice4" data-factor="stability" data-tooltip-target="slice4" style="cursor: pointer;"></path><path id="slice5" class="ifgTooltipSliceOpacityLight Fundamental3785 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-378,200,200)" data-slice="slice5" data-factor="fundamental" data-tooltip-target="slice5" style="cursor: pointer;"></path></svg></div></div><!-- STOP.Element_FactorDiagram -->',tooltips:{slice1:{title:"Technical",status:"Strong",score:"51",description:"Technical shows the stock's strength based on short, medium and long term technical analysis. The stronger the stock, the higher investor optimism is considered to be. According to Investtech's research, technically positive stocks have developed well and outperformed other stocks.",elements:[{name:"RSI momentum",value:"51.2",score:"6"},{name:"Technical short term",value:"17.9",score:"-0"},{name:"Technical medium term",value:"67.3",score:"100"},{name:"Technical long term",value:"77.9",score:"100"},{name:"Total technical",value:" ",score:"51"}]},slice2:{title:"Quantitative",status:"Neutral",score:"3",description:"Quantitative measures the stock's estimated future return compared to the other stocks in the market. The factor is calculated from the statistical return of stocks with similar quantitative characteristics. The stock's trend status, support and resistance levels, price patterns, momentum and insider trades are used, and the score is adjusted for high or low volatility and liquidity.",elements:[{name:"Quantitative ranking",value:"51.3",score:"3"},{name:"Total quantitative",value:" ",score:"3"}]},slice3:{title:"Insider",status:"Neutral",score:"14",description:"Insider is the stock's assessment based on reported insider trades. When directors of the board, executives and other insiders who are required to report trades purchase stocks in their respective companies, it indicates that they believe in rising prices and that no immediate negative surprises are forthcoming. Insider analysis can be considered a simplified fundamental analysis.",elements:[{name:"Inside score",value:"14.4",score:"14"},{name:"Total insider",value:" ",score:"14"}]},slice4:{title:"Stability",status:"Strong",score:"89",description:"Stability is an assessment of the likely stability of the stock price. Stocks with high stability have historically had low price fluctuations, strong liquidity and been listed on the stock exchange for a long time. The risk of falling prices is low in such stocks, but the upside can be low as well. In other words, expect stable price development with only small changes. Stocks with low stability have high risk. It is risky to own and trade them, and they can both fall and rise a lot in a short period of time.",elements:[{name:"Volatility month",value:"11.6",score:"85"},{name:"Liquidity million NOK",value:"385.5",score:"88"},{name:"Age years",value:">25.0",score:"100"},{name:"Total stability",value:" ",score:"89"}]},slice5:{title:"Fundamental",status:"Strong",score:"55",description:"Fundamental describes the stock's value based on accounting value and financial quality. The factor is calculated from stock price vs the company's earnings, i.e. its P/E (price-to-earnings ratio) and its book value, i.e. P/B (price-to-book value ratio). High fundamental value often means low downside risk, while low fundamental value often indicates good growth opportunities and a large upside.",elements:[{name:"P/E",value:"12.2",score:"79"},{name:"P/B",value:"2.3",score:"32"},{name:"Total fundamental",value:" ",score:"55"}]}},labelsAndTexts:{title:"Factor diagram",explanation:"Investtech's Factor diagram visualises the stock's most important qualities. The more green, the more positive the stock is considered to be.",cterm_element:"Element",context:"",cterm_value:"Value",cterm_score:"Score",cterm_see_more:"See more",help_source:"h2_FactorDiagram"}})})}[e]=f.then?(await f)():f;let h=`
import { Button } from '@/components/external-components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/external-components/card';
import { Skeleton } from '@/components/external-components/skeleton';
import { RenderHTML } from '@/utils/create-mark-up';
import dynamic from 'next/dynamic';
import { usePlatform } from '@/lib/platform';
import {
  FactorDiagramTooltips,
  FactorDiagramLabelsAndTexts,
  FactorDiagram,
} from '@/lib/types/shared-components';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Dynamic imports for FactorDiagram components
const FactorDiagramDesktop = dynamic(
  () => import('@/components/custom-components/factor-diagram/factor-diagram'),
  {
    loading: () => <Skeleton className="h-[400px] w-full rounded-lg" />,
    ssr: true,
  }
);

const FactorDiagramMobile = dynamic(
  () => import('@/components/custom-components/factor-diagram/factor-diagram-mobile'),
  {
    loading: () => <Skeleton className="h-[400px] w-full rounded-lg" />,
    ssr: true,
  }
);

// Wrapper component to conditionally render mobile or desktop factor diagram
function FactorDiagramWrapper({
  rawSvgHtml,
  tooltips,
  labelsAndTexts,
}: {
  rawSvgHtml: string;
  tooltips?: FactorDiagramTooltips;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}) {
  const platform = usePlatform();
  const isMobileOrTablet = platform === 'mobile' || platform === 'tablet';

  if (isMobileOrTablet) {
    return (
      <FactorDiagramMobile
        rawSvgHtml={rawSvgHtml}
        tooltips={tooltips}
        labelsAndTexts={labelsAndTexts}
      />
    );
  }

  return (
    <FactorDiagramDesktop
      rawSvgHtml={rawSvgHtml}
      tooltips={tooltips}
      labelsAndTexts={labelsAndTexts}
    />
  );
}

export function FactorDiagramContainer({
  factor_diagram,
  labels_and_texts,
}: {
  factor_diagram: FactorDiagram;
  labels_and_texts: FactorDiagramLabelsAndTexts;
}) {

  const router = useRouter();

  // Memoize click handler to prevent unnecessary re-renders
  const handleSeeMoreClick = useCallback(() => {
    router.push('/' + '/docs/' + factor_diagram.help_post_name);
  }, [router, factor_diagram.help_post_name]);

  return (
    <>
      {!factor_diagram.is_dummy && !factor_diagram.svg.includes('factorGraphNoData') && (
        <Card
          className="justify-between space-y-4 rounded-none p-5 sm:rounded-xl"
          id="factor-diagram-card"
        >
          <CardHeader className="md:mb-0" id="factor-diagram-header">
            <CardTitle className={'text-grey-700 dark:text-grey-50 text-[10px] font-medium uppercase'} id="factor-diagram-title">
              <RenderHTML html={labels_and_texts.title} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center" id="factor-diagram-content">
            <div className="text-center">
              <div className="justify-self-center" id="factor-diagram-container">
                <FactorDiagramWrapper
                  rawSvgHtml={factor_diagram.svg}
                  tooltips={factor_diagram.tooltips}
                  labelsAndTexts={labels_and_texts}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter id="factor-diagram-footer">
            {/* Factor Diagram Description */}
            <div id="factor-diagram-description">
              {/* <p className="dark:text-grey-50 text-sm font-bold text-black">
              {dummy_factor_diagram_explanation}
            </p> */}
              <p className={'text-grey-800 dark:text-grey-50 text-sm font-normal'}>
                <RenderHTML html={labels_and_texts.explanation ?? ''} />{' '}
                <Button
                  variant="link"
                  className="m-0 h-auto cursor-pointer p-0 text-sm font-normal underline"
                  onClick={handleSeeMoreClick}
                  id="factor-diagram-see-more-button"
                >
                  <RenderHTML html={labels_and_texts.cterm_see_more} />
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
`,i={factor_diagram:{svg:"SVG string containing the factor diagram visualization",tooltips:{slice1:{title:"Technical",status:"Strong",score:"51",description:"Description of the technical factor...",elements:[{name:"RSI momentum",value:"51.2",score:"6"}]},slice2:{title:"Quantitative",status:"Neutral",score:"3",description:"Description of the quantitative factor...",elements:[{name:"Quantitative ranking",value:"51.3",score:"3"}]},slice3:{title:"Insider",status:"Neutral",score:"14",description:"Description of the insider factor...",elements:[{name:"Inside score",value:"14.4",score:"14"}]},slice4:{title:"Stability",status:"Strong",score:"89",description:"Description of the stability factor...",elements:[{name:"Volatility month",value:"11.6",score:"85"}]},slice5:{title:"Fundamental",status:"Strong",score:"55",description:"Description of the fundamental factor...",elements:[{name:"P/E",value:"12.2",score:"79"}]}},labels_and_texts:{title:"Factor diagram",explanation:"Help text...",cterm_element:"Element",cterm_value:"Value",cterm_score:"Score",cterm_see_more:"See more",help_source:"h2_FactorDiagram"}}};a.s(["FactorDiagramDemo",()=>g,"factorDiagramCode",0,h,"factorDiagramJson",0,i]),c()}catch(a){c(a)}},!1),69999,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(83792),f=a.i(80977),g=b([e]);[e]=g.then?(await g)():g;let j=[{id:"section-0",title:"Introduction"},{id:"section-1",title:"Getting Started"},{id:"section-2",title:"Components"},{id:"section-3",title:"API Reference"},{id:"section-4",title:"Examples"},{id:"section-5",title:"Best Practices"},{id:"section-6",title:"Troubleshooting"},{id:"section-7",title:"FAQ"}];function h({sections:a}){let{registerSection:b}=(0,f.useTableOfContentsContext)();return(0,d.jsx)("div",{className:"space-y-32",children:a.map((a,c)=>{let e=`section-${c}`;return(0,d.jsxs)("div",{ref:a=>b(e,a),id:e,className:"min-h-[400px] rounded-lg border p-8",children:[(0,d.jsx)("h2",{className:"mb-4 text-2xl font-bold",children:a.title}),(0,d.jsxs)("p",{className:"text-muted-foreground",children:["This is the content for ",a.title,". Scroll down to see the table of contents highlight the active section. Click on any item in the table of contents to navigate to that section."]}),(0,d.jsxs)("div",{className:"mt-4 space-y-2",children:[(0,d.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),(0,d.jsx)("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]},e)})})}function i(){return(0,d.jsx)("div",{className:"flex gap-8",children:(0,d.jsxs)(f.TableOfContentsProvider,{sections:j,children:[(0,d.jsx)("div",{className:"flex-1",children:(0,d.jsx)(h,{sections:j})}),(0,d.jsx)(e.default,{sections:j,title:"Table of Contents"})]})})}let k=`'use client';

import TableOfContents, {
  TableOfContentsProvider,
  useTableOfContentsContext,
} from '@/components/custom-components/intra-page-menu';

// Define your sections
const sections = [
  { id: 'section-0', title: 'Introduction' },
  { id: 'section-1', title: 'Getting Started' },
  { id: 'section-2', title: 'Components' },
  // ... more sections
];

// Component to register sections with refs
function SectionContent({ sections }: { sections: typeof sections }) {
  const { registerSection } = useTableOfContentsContext();

  return (
    <div className="space-y-32">
      {sections.map((section, index) => {
        const sectionId = \`section-\${index}\`;
        return (
          <div
            key={sectionId}
            ref={(el) => registerSection(sectionId, el)}
            id={sectionId}
            className="min-h-[400px] rounded-lg border p-8"
          >
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            {/* Your section content */}
          </div>
        );
      })}
    </div>
  );
}

// Usage
export function MyPage() {
  return (
    <TableOfContentsProvider sections={sections}>
      <div className="flex gap-8">
        <div className="flex-1">
          <SectionContent sections={sections} />
        </div>
        <TableOfContents sections={sections} title="Table of Contents" />
      </div>
    </TableOfContentsProvider>
  );
}`;a.s(["IntraPageMenuDemo",()=>i,"intraPageMenuCode",0,k]),c()}catch(a){c(a)}},!1),64600,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(91217),f=b([e]);function g(){return(0,d.jsx)("div",{children:(0,d.jsx)(e.default,{countRow:120,pageSize:10,isAPILoad:!1})})}[e]=f.then?(await f)():f;let h=`
'use client';

import * as React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/external-components/pagination';
import { Spinner } from '@/components/custom-components/spinner';

/**
 * Props for the Paginator component
 */
interface PaginatorProps {
  /** Callback function called when page changes */
  pageParent?: (page: number) => void;
  /** Number of items per page */
  pageSize?: number;
  /** Callback function called when page size changes */
  pageSizeParent?: (size: number) => void;
  /** Whether to show loading spinner */
  isAPILoad?: boolean;
  /** Total number of rows */
  countRow?: number;
}

/**
 * Paginator component for navigating through paginated data.
 * Includes page size selector and previous/next navigation.
 *
 * @param props - The component props
 * @returns A paginator component
 */
export function Paginator({
  pageParent = () => {},
  pageSize = 20,
  pageSizeParent = () => {},
  isAPILoad = false,
  countRow = 100,
}: PaginatorProps) {
  const textColor = 'text-grey-700 dark:text-grey-200';

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [selectedPageSize, setSelectedPageSize] = React.useState<number>(pageSize);
  const [totalPage, setTotalPage] = React.useState(1);
  const resultLength = [5, 10, 20, 50, 80, 100];

  React.useEffect(() => {
    setTotalPage(Math.ceil(countRow / selectedPageSize));
  }, [selectedPageSize, countRow]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pageParent?.(page);
  };

  const handleResultPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setSelectedPageSize(newPageSize);
    setCurrentPage(1);
    pageSizeParent?.(newPageSize);
    pageParent?.(1);
  };

  return (
    <div className="mt-4 flex flex-row items-center justify-start gap-4">
      <div className="flex w-auto items-center justify-end">
        <label htmlFor="pageSize" className={\`mr-2 text-xs font-normal \${textColor}\`}>
          Rows per page
        </label>
        <select
          id="pageSize"
          className={\`\${textColor} rounded-md border p-2\`}
          value={selectedPageSize}
          onChange={handleResultPerPageChange}
          aria-label="Select rows per page"
        >
          {resultLength.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <Pagination>
        <PaginationContent className="list-none">
          <PaginationItem>
            <p className={\`\${textColor} text-xs font-normal\`}>
              {(currentPage - 1) * selectedPageSize + (countRow > 0 ? 1 : 0)} -
              {currentPage * selectedPageSize > countRow
                ? countRow
                : currentPage * selectedPageSize}{' '}
              of {countRow}
            </p>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              className={\`\${textColor} cursor-pointer \${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}\`}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              aria-label="Go to previous page"
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={\`\${textColor} cursor-pointer \${currentPage === totalPage ? 'pointer-events-none opacity-50' : ''}\`}
              onClick={() => handlePageChange(Math.min(totalPage, currentPage + 1))}
              aria-label="Go to next page"
              aria-disabled={currentPage === totalPage}
            />
          </PaginationItem>
          <PaginationItem>{isAPILoad && <Spinner />}</PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}`;a.s(["PaginatorDemo",()=>g,"paginatorCode",0,h]),c()}catch(a){c(a)}},!1),1780,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(88608),f=b([e]);function g(){return(0,d.jsx)(e.ChartPieDonut,{data:i.pie_section})}[e]=f.then?(await f)():f;let h=`
'use client';

import { Cell, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/external-components/card';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/external-components/chart';

import dummyDonutJson from './dummy-donut.json';

const volat = dummyDonutJson.pieData.volat;

function CategoryLegend({ categories }: { categories: typeof volat.categories }) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center gap-3 text-sm">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: category.color }} />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

interface RenderLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  name: string;
  percent: number;
}

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  percent,
}: RenderLabelProps) => {
  const RADIAN = Math.PI / 180;
  const MIN_LABEL_ANGLE = 15; // degrees

  // Convert percent → angle
  const angle = percent * 360;

  // Not enough space → don't render label
  if (angle < MIN_LABEL_ANGLE) return null;

  // Position text in the middle of the slice
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {name}
    </text>
  );
};

// Create a lookup map for categories
const categoryColorMap = volat.categories.reduce(
  (acc, category) => {
    acc[category.id] = category.color;
    return acc;
  },
  {} as Record<number, string>
);

// Convert to array (Recharts needs array)
const chartData = volat.data.map((item) => ({
  sectionLabel: item.label, // ERICB, NEL, NHY
  value: item.value, // 53.84, 1.27, 44.89
  description: item.description,
  fill: categoryColorMap[item.categoryId], // color from category
}));

const chartConfig = {
  value: {
    label: 'value',
  },
} satisfies ChartConfig;

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center text-base font-medium">{volat.chart.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const data = payload[0].payload;

                return (
                  <div className="bg-grey-800 dark:bg-grey-50 rounded-md px-3 py-2 text-sm text-white shadow-md dark:text-black">
                    <div className="text-muted-foreground">{data.description}</div>
                  </div>
                );
              }}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="sectionLabel"
              innerRadius={40}
              stroke={\`var(--color-card)\`}
              strokeWidth={1.8}
              isAnimationActive={false}
              label={renderLabel}
              labelLine={false}
            />
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <CategoryLegend categories={volat.categories} />
      </CardFooter>
    </Card>
  );
}
`,i={pie_section:{available_charts:["volat","liquidity","technical","inside","sector_diversification"],insider_exists:1,show_insider:0,pie:{volat:{chart:{type:"pie",variable:"VOLAT22"},title:"Volatility",display_order:1,order_function:"1*$category_id*100 + $sequence",is_open:!0,categories:[{id:0,name:"Low",upper_limit:10,style_id:2,color_name:"colPositive"},{id:1,name:"Medium",upper_limit:20,style_id:0,color_name:"colNeutral"},{id:2,name:"High",upper_limit:40,style_id:-1,color_name:"colWeakNegative"},{id:3,name:"Extreme",upper_limit:null,style_id:-2,color_name:"colNegative"}],data:[{order:101,category_id:1,label:"ERICA",description:"Ericsson A: Medium",value:"9.92"},{order:102,category_id:1,label:"ERICB",description:"Ericsson B: Medium",value:"49.53"},{order:103,category_id:1,label:"NHY",description:"Norsk Hydro: Medium",value:"39.52"},{order:204,category_id:2,label:"NEL",description:"NEL: High",value:"1.03"}]},liquidity:{chart:{type:"pie",variable:"MAINFACTOR_STABILITY_LIQ"},title:"Liquidity",display_order:-1,order_function:"-1*$category_id*100 + $sequence",is_open:!0,categories:[{id:0,name:"Illiquid",upper_limit:10,style_id:-2,color_name:"colNegative"},{id:1,name:"Bad",upper_limit:33.3,style_id:-1,color_name:"colWeakNegative"},{id:2,name:"Medium",upper_limit:66.7,style_id:0,color_name:"colNeutral"},{id:3,name:"Good",upper_limit:null,style_id:1,color_name:"colPositive"}],data:[{order:-298,category_id:3,label:"ERICB",description:"Ericsson B: Good",value:"49.53"},{order:-296,category_id:3,label:"NHY",description:"Norsk Hydro: Good",value:"39.52"},{order:-199,category_id:2,label:"ERICA",description:"Ericsson A: Medium",value:"9.92"},{order:-197,category_id:2,label:"NEL",description:"NEL: Medium",value:"1.03"}]},technical:{chart:{type:"pie",variable:"MAINFACTOR_TECHNICAL"},title:"Technical condition",display_order:-1,order_function:"-1*$category_id*100 + $sequence",is_open:!0,categories:[{id:0,name:"Negative",upper_limit:25,style_id:-2,color_name:"colNegative"},{id:1,name:"Slight negative",upper_limit:37.5,style_id:-1,color_name:"colWeakNegative"},{id:2,name:"Neutral",upper_limit:62.5,style_id:0,color_name:"colNeutral"},{id:3,name:"Slight positive",upper_limit:75,style_id:1,color_name:"colWeakPositive"},{id:4,name:"Positive",upper_limit:null,style_id:2,color_name:"colPositive"}],data:[{order:-399,category_id:4,label:"ERICA",description:"Ericsson A: Positive",value:"9.92"},{order:-398,category_id:4,label:"ERICB",description:"Ericsson B: Positive",value:"49.53"},{order:-396,category_id:4,label:"NHY",description:"Norsk Hydro: Positive",value:"39.52"},{order:-197,category_id:2,label:"NEL",description:"NEL: Neutral",value:"1.03"}]},inside:{chart:{type:"pie",variable:"MAINFACTOR_INSIDE"},title:"Insider trades",display_order:-1,order_function:"-1*$category_id*100 + $sequence",is_open:!1,categories:[{id:0,name:"Negative",upper_limit:25,style_id:-2,color_name:"colNegative"},{id:1,name:"Slight negative",upper_limit:37.5,style_id:-1,color_name:"colWeakNegative"},{id:2,name:"Neutral",upper_limit:62.5,style_id:0,color_name:"colNeutral"},{id:3,name:"Slight positive",upper_limit:75,style_id:1,color_name:"colWeakPositive"},{id:4,name:"Positive",upper_limit:null,style_id:2,color_name:"colPositive"}],data:[{order:-199,category_id:2,label:"TICKER",description:"TICKER",value:"9.92"},{order:-198,category_id:2,label:"TICKER",description:"TICKER",value:"49.53"},{order:-197,category_id:2,label:"TICKER",description:"TICKER",value:"1.03"},{order:-196,category_id:2,label:"TICKER",description:"TICKER",value:"39.52"}],free_trial_link:"?CountryID=1&product=0&lp=trial",free_trial_label:"Free Trial Now"},sector_diversification:{chart:{type:"pie",variable:"EXT_SECTOR_LEVEL1"},title:"Diversification",display_order:1,order_function:"1*$category_id*100 + $sequence",is_open:!0,categories:[{id:0,name:"Technology",upper_limit:null,style_id:0,color_name:"colSectorIT"},{id:1,name:"Basic Materials",upper_limit:null,style_id:0,color_name:"colSectorBasicMaterials"},{id:2,name:"Energy",upper_limit:null,style_id:0,color_name:"colSectorEnergy"}],data:[{order:1,category_id:0,label:"ERICA",description:"Ericsson A: Technology",value:"9.92"},{order:2,category_id:0,label:"ERICB",description:"Ericsson B: Technology",value:"49.53"},{order:104,category_id:1,label:"NHY",description:"Norsk Hydro: Basic Materials",value:"39.52"},{order:203,category_id:2,label:"NEL",description:"NEL: Energy",value:"1.03"}]}},api_guide:["categories upper_limit: Upper limit for category. Null means no upper limit (infinite).","order_function: used on members when populating the pie to make the order of pie segments match the order of categories.","is_open: whether the pie chart is open or hidden. Used for setting free trial teaser/link in marketing pages."]}};a.s(["ChartPieDonutDemo",()=>g,"pieDonutChartCode",0,h,"pieDonutChartJson",0,i]),c()}catch(a){c(a)}},!1),7102,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(20885),f=b([e]);function g(){return(0,d.jsx)(e.ProgressBarTooltip,{value:33,indicatorClassName:"bg-green-700",className:"bg-green-700/20",barTitle:"Progress",barValue:"33%"})}[e]=f.then?(await f)():f;let h=`import { ProgressBarTooltip } from '@/components/custom-components/progress-bar-tooltip';

export function ProgressBarTooltipDemo() {
  return <ProgressBarTooltip value={33} indicatorClassName="bg-green-700" className="bg-green-700/20" />;
}`;a.s(["ProgressBarTooltipDemo",()=>g,"progressBarTooltipCode",0,h]),c()}catch(a){c(a)}},!1),53932,a=>{"use strict";let b=`
      signal_stat_criteria: {
        market_id: '1',
        market_term_code: 'US',
        description: 'US Market signals',
      },
      has_signals: true,
      signals: {
        trbr_u: {
          post_name: 'h_TR',
          indicator_pseudo: 'TR',
          importance: '40',
          title: 'Rising trend',
          ingress:
            'Rising trends indicate that the company experiences positive development and increasing buy interest among investors.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_TR_0.png',
            src_light: 'https://www.investtech.com/images/help/h_TR_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_TR_1.png',
            src_light_big: 'https://www.investtech.com/images/help/indicator/h_TR.720x400_0.png',
            src_dark_big: 'https://www.investtech.com/images/help/indicator/h_TR.720x400_1.png',
          },
          help_url: '?MarketID=461&p=staticPage&mode=singleItem&fn=h_TR&parentFn=helpResearchTrend',
          recommendation: 'buy',
          arrow_direction: '19',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:221010-Trend rising. Ann_excess_ret: 6.52 (35097)',
            annual_excess_return: '+6.5',
            num_signals: '35097',
            num_signals_text: '35097 signals Nordic stocks.',
            color: 'buy',
          },
        },
        srres_close: {
          post_name: 'h_SupClose',
          indicator_pseudo: 'SRSupClose',
          importance: '30',
          title: 'Price near support',
          ingress:
            'Price is near support. The stock has reversed here before. Many investors find it to be cheap and may wish to buy again.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_SupClose_0.png',
            src_light: 'https://www.investtech.com/images/help/h_SupClose_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_SupClose_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_SupClose.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_SupClose.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_SupClose&parentFn=helpResearchSupportAndResistance',
          recommendation: 'watch',
          arrow_direction: '10',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:304000-Price near support (aggr). Ann_excess_ret:-0.73 (39112)',
            annual_excess_return: '-0.7',
            num_signals: '39112',
            num_signals_text: '39112 signals Nordic stocks.',
            color: 'watch',
          },
        },
        pvcpos_thor: {
          post_name: 'h_PatRecBuy',
          indicator_pseudo: 'PatternBuyRec',
          importance: '20',
          title: 'Buy signal from rectangle formation',
          ingress:
            'A buy signal from a rectangle formation signals increasing optimism among investors and signals that the stock continues or enters a rising trend.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_PatRecBuy_0.png',
            src_light: 'https://www.investtech.com/images/help/h_PatRecBuy_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_PatRecBuy_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_PatRecBuy.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_PatRecBuy.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_PatRecBuy&parentFn=helpResearchFormations',
          recommendation: 'buy',
          arrow_direction: '19',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:201000-Rectangle broken up. Ann_excess_ret: 8.94 (3368)',
            annual_excess_return: '+8.9',
            num_signals: '3368',
            num_signals_text: '3368 signals Nordic stocks.',
            color: 'buy',
          },
        },
        rsi_low: {
          post_name: 'h_RsiHigh',
          indicator_pseudo: 'RsiHigh',
          importance: '15',
          title: 'High positive momentum and overbought',
          ingress:
            'The stock has high positive momentum and RSI is overbought, see the red colour in the price chart. The stock price has risen a lot, without significant corrections downwards. This is common in rising trends, but may indicate that the price soon will fall in horizontal or falling trends.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_RsiHigh_0.png',
            src_light: 'https://www.investtech.com/images/help/h_RsiHigh_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_RsiHigh_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_RsiHigh.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_RsiHigh.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_RsiHigh&parentFn=helpResearchMomentumAndRsi',
          recommendation: 'buy',
          arrow_direction: '19',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:623721-RSI ligger over 70. Ann_excess_ret: 7.41 (35864)',
            annual_excess_return: '+7.4',
            num_signals: '35864',
            num_signals_text: '35864 signals Nordic stocks.',
            color: 'buy',
          },
        },
        ihs_watch: {
          post_name: 'h_PatIhsWatch',
          indicator_pseudo: 'IhsWatch',
          importance: '10',
          title: 'Developing inverse head and shoulders formation',
          ingress:
            'A potential inverse head and shoulders formation is developing. It may trigger a strong buy signal.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_PatIhsWatch_0.png',
            src_light: 'https://www.investtech.com/images/help/h_PatIhsWatch_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_PatIhsWatch_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_PatIhsWatch.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_PatIhsWatch.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_PatIhsWatch&parentFn=helpResearchFormations',
          recommendation: 'watch',
          arrow_direction: '10',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            width: '24',
            height: '24',
          },
          has_statistics: false,
          priority: 'pri2',
          statistics: {
            info: '',
            annual_excess_return: '',
            num_signals: '',
            num_signals_text: '',
            color: 'neutral',
          },
        },
      } as unknown as Signals,
    },
    labels_and_texts: {
      module_title: 'Current Signals',
      sub_title: 'Technical Analysis',
      see_more: 'See more',
      help_source: 'signals-help',
      pp: '%',
      market_term: 'US Market',
      help_data: {
        post_name: 'signals-help',
        found: true,
        data: {
          title: 'About Technical Signals',
          teaser_text_short: 'Learn more about technical signals and how they work.',
          teaser_text:
            'Technical signals are indicators based on price action, volume, and other technical analysis factors. They help identify potential buy or sell opportunities in the market.',
          content: 'Full help content...',
        },
        meta: {
          post_id: '123',
          language: 'en',
        },
      },
    },
  };

  // return <SignalsSection data={sampleData} />;
}
`,c={data:{data:{signal_stat_criteria:{market_id:"1",market_term_code:"US",description:"US Market signals"},has_signals:!0,signals:{trbr_u:{post_name:"trbr-u-signal",indicator_pseudo:"TRBR_U",importance:"high",title:"Trend Break Up",ingress:"Signal indicating upward trend break",help_teaser_image:{type:"image",src_light:"/screenshot/gain.png",src_dark:"/screenshot/gain.png",src_light_big:"/screenshot/gain.png",src_dark_big:"/screenshot/gain.png"},help_url:"/docs/trbr-u-signal",has_statistics:!0,priority:"high",statistics:{info:"Statistics info",annual_excess_return:"+12.5",num_signals:"25",num_signals_text:"25 signals in the last year",color:"buy"},recommendation:"Buy",arrow_direction:"up",arrow_image:{type:"image",src:"/screenshot/gain.png"}},srres_close:{post_name:"srres-close-signal",title:"Support/Resistance Close",has_statistics:!0,statistics:{color:"buy",annual_excess_return:"+8.3",num_signals_text:"18 signals in the last year"}},thor:{post_name:"thor-signal",title:"THOR Signal",has_statistics:!1},rsi_low:{post_name:"rsi-low-signal",title:"RSI Low",has_statistics:!0,statistics:{color:"sell",annual_excess_return:"-2.1",num_signals_text:"12 signals in the last year"}},pvcpos_thor:{post_name:"pvcpos-thor-signal",title:"Volume Position THOR",has_statistics:!0,statistics:{color:"buy",annual_excess_return:"+15.8",num_signals_text:"30 signals in the last year"}}}},labels_and_texts:{module_title:"Current Signals",sub_title:"Technical Analysis",help_source:"signals-help",pp:"%",market_term:"US Market",help_data:{post_name:"signals-help",found:!0,data:{title:"About Technical Signals",teaser_text_short:"Learn more about technical signals and how they work.",teaser_text:"Technical signals are indicators based on price action, volume, and other technical analysis factors.",content:"Full help content..."},meta:{post_id:"123",language:"en"}}}},keyInfoLabelsAndTexts:{see_more:"See more",factor_diagram_card_title:"Factor diagram",factor_diagram_card_help:"Help text",see_more_info:"See more info",factor_diagram_element:"Element",factor_diagram_value:"Value",factor_diagram_score:"Score"}};a.s(["signalsSectionCode",0,b,"signalsSectionJson",0,c])},3677,a=>{"use strict";var b=a.i(87924),c=a.i(1305);function d(){return(0,b.jsx)(c.Spinner,{})}let e=`
import * as React from 'react';

/**
 * Spinner component for displaying loading states.
 * Animated spinning circle with custom styling.
 *
 * @returns A spinner component
 */
export default function SpinnerDemo() {
  return (
    <div className="border-t-primary border-grey-200 h-5 w-5 animate-spin rounded-full border-2"></div>
  );
}
`;a.s(["default",()=>d,"spinnerCode",0,e])},26483,a=>a.a(async(b,c)=>{try{a.i(87924);var d=a.i(76632),e=b([d]);[d]=e.then?(await e)():e;let f=`'use client';

import * as React from 'react';

import { usePlatform } from '@/lib/platform';

import { Popover, PopoverContent, PopoverTrigger } from '../external-components/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '../external-components/tooltip';

interface TableCellTooltipProps {
  value: React.ReactNode;
  tooltip: React.ReactNode;
  style?: React.CSSProperties;
}

export function TableCellTooltip({ value, tooltip, style }: TableCellTooltipProps) {
const platform = usePlatform();
const [open, setOpen] = React.useState(false);

  if (!tooltip) {
    return <div style={style}>{value}</div>;
  }

  const triggerContent = (
    <>
      <span className="absolute -top-1 right-0 left-0 h-1" />
      {value}
    </>
  );

  if (platform !== 'desktop') {
    // Use Popover for touch devices

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="cursor-pointer pt-0.5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Show tooltip"
            style={style}
          >
            {triggerContent}
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" align="center" className="p-2 text-sm">
          {tooltip}
        </PopoverContent>
      </Popover>
    );
  }

  // Use Tooltip for desktop (hover-based)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-pointer pt-0.5" style={style}>
          {triggerContent}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="p-2 text-sm">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
`,g={data_and_calculation_warnings_section:{has_warnings:!1,warning_count:0,warnings:[],api_guide:{source:"factorCompany warnings relate to data availability/quality. healthElement warnings relate to calculation assumptions.",health_key:"For healthElement warnings, use healthKey to reference specific health element data.",rendering:"Display below overall and elements health scores. Important to warn users on assumptiona and possible data errors affecting the correctness of the health analysis."}},correlation_analysis:{title:"Correlation matrix",correlation_matrix:{l0:{c0:1,c1:.191,c2:.206,c3:.242},l1:{c0:.191,c1:1,c2:.147,c3:.146},l2:{c0:.206,c1:.147,c2:1,c3:.987},l3:{c0:.242,c1:.146,c2:.987,c3:1}},company_keys:{i0:100103,i1:100718,i2:0x2bf709d,i3:0x2bf709e},company_keys_info:"The companyIds for corresponding columns and rows of the correlation matrix. Use for lookup of tickers etc.",categories:[{category_id:0,name:"correlationLow",corr_limit_low:0,corr_limit_high:.3,color_class:"tableCellPositive"},{category_id:1,name:"correlationMedium",corr_limit_low:.3,corr_limit_high:.5,color_class:"tableCellNeutral"},{category_id:2,name:"correlationHigh",corr_limit_low:.5,corr_limit_high:.85,color_class:"tableCellNegative"},{category_id:3,name:"correlationExtremelyHigh",corr_limit_low:.85,corr_limit_high:1,color_class:"tableCellExtremelyNegative"}],correlation_table:{c_name:"cleanTable",id:"correlationMatrix",column_headers:{i0:"corr",i1:"NHY",i2:"NEL",i3:"ERICB"},column_data_type:{i0:"string",i1:"general",i2:"general",i3:"general"},caption:"Calculated correlation is based on price changes in the past 66 days.",cell_content:{l0:{c0:"NEL",c1:"0.2",c2:"",c3:""},l1:{c0:"ERICB",c1:"0.2",c2:"0.1",c3:""},l2:{c0:"ERICA",c1:"0.2",c2:"0.1",c3:"1.0"}},cell_category:{l0:{c0:null,c1:0,c2:null,c3:null},l1:{c0:null,c1:0,c2:0,c3:null},l2:{c0:null,c1:0,c2:0,c3:3}},cell_tooltip:{l0:{c0:"",c1:"corr(NEL,NHY)=0.2",c2:"",c3:""},l1:{c0:"",c1:"corr(ERICB,NHY)=0.2",c2:"corr(ERICB,NEL)=0.1",c3:""},l2:{c0:"",c1:"corr(ERICA,NHY)=0.2",c2:"corr(ERICA,NEL)=0.1",c3:"corr(ERICA,ERICB)=1.0"}},cell_class:{l0:{c0:"",c1:"tableCellPositive"},l1:{c0:"",c1:"tableCellPositive",c2:"tableCellPositive"},l2:{c0:"",c1:"tableCellPositive",c2:"tableCellPositive",c3:"tableCellExtremelyNegative"}}},correlation_table_info:"correlationTable contains: columnHeaders, cellContent (raw values), cellCategory (0-3), cellTooltip (hover text), cellClass (CSS classes)",mean_correlation:"0.34",num_not_correlated:5,num_highly_correlated:1,num_medium_correlated:0,frac_not_correlated:"0.83",frac_highly_correlated:"0.17",frac_medium_correlated:"0.00",highlights_text:"Average correlation factor is 0.34.",details_text:"83% of the stocks have low correlation, 0% have medium correlation and 17% have strong correlation.",warning_text:"",help_data:{title:"Stock correlation",text_primary:"",text_secondary:"<p>Correlation is a statistical term for the degree of covariation between two quantities. When two stocks fluctuate strongly in sync, for example two oil stocks that rise when oil prices rise, correlation is strong. When there is little correlation between how two stocks perform, for example a bank and an oil company, correlation is weak.</p><br><p>Stocks that fluctuate completely in sync get a correlation factor of c=1.0. If the correlation factor is above 0.5, the stocks are considered strongly correlated, while above 0.3 are considered moderately correlated, and below 0.3 are considered uncorrelated. Stocks that move in the opposite direction will have a negative correlation factor.</p>",display_guide:"helper card (desktop), hover tip (mobile)"}},api_info:{status:"success",timestamp:"2026-01-28 06:04:05",market_id:"1",market_name:"Oslo Børs",mode:"pid",input_params:["context","pid","lang","sections","factorDiagramWidth"],used_param:"pid=39901"},api_guide:{title:"Portfolio Health Check API Guide",description:"This API provides portfolio health analysis using existing Investtech algorithms and scoring.",endpoint:"/index.php?context=health_check",methods:["GET"],version:"1.01",latest_additions:["20260127, v 1.01: GL. Html specific code moved to class_PortfolioTools_html.php. class_PortfolioTools.php clean for handling API.","20260127, v 1.0: GL. Full version with some cleanup done, i.e. removal of hex color codes.","20260127, v 0.96: GL. Chart api param changes for stocks in the portfolio development section and the portfolio chart.","20260126, v 0.95: GL. First complete version with all necessary sections and data. Not yet coordinated with front in details, and not well tested, yet some debug and test-functionality also implemented.","20260123, v 0.93: GL. Bugfix in svgchart API when handling &type=myport.","20260123, v 0.92: GL. New section, &sections=test_links, provided for links to test portfolios to ease back and front testing.","20260123, v 0.91: GL. Handling parameter &factor_diagram_width=.","20260123, v 0.9: GL. Portfolio development report (sections=portfolio_development_report), full version. Help data with same structure as for the other sections.","20260122, v 0.83: GL. Portfolio development report, highlights section first version.","20260121, v 0.82: GL. Color names for donut categories (used for legends and segments).","20260121, v 0.81: GL. Updated factor diagram code. full_health_report_link_text moved from overall to elements-section.","20260120, v 0.8: GL. Factor diagram using common code for company and health check.","20260120, v 0.76: GL. Updated factor diagram and added health_check_viewer.html.","20260119, v 0.73: GL. First version of factor diagram.","20260116, v 0.72: GL. Added kpi_table_formatted.","20260116, v 0.71: GL. Handling of long help text sections with header/text structs, like for static pages, using cf_htmlToJsonReady($structOrArray).",'20260114, v 0.7: GL. KPIs section and data_and_calculation_warnings section. Handling "&sections=kpis".','20260114, v 0.61: GL. Pies section key renamed to pies, i.e. "&sections=pies". Now handling sections "health_data,pies,kpis,correlation_analysis"',"20260114, v 0.6: GL. Full health report.",'20260113, v 0.5: GL. Health data for overall health and the eight element healths. Used for making score bars on with hover info. Handling "&sections=health_data".',"20260113, v 0.45: GL. Associative arrays used throughout API data structures for better JSON compatibility (uses cf_ensureKeysSet).","20260113, v 0.42: GL. Handling parameter &sections=, taking values for sections: correlation_analysis,pies,health_data.","20260113, v 0.41: GL. Small changes to correlation matrix.","20260112, v 0.4: GL. Correlation matrix added.","20260112, v 0.31: GL. Color removed from pie members, and now only in the categories data.","20260109, v 0.3: GL. New structure with pies contained in the pies section and members sorted by priority","20260108, v 0.25: GL. Initial version of pies section and pie_charts"],examples:{portfolio_health:"/index.php?context=health_check&portfolio_id=39901",watchlist_health:"/index.php?context=health_check&watchlist_id=12345",custom_portfolio:"/index.php?context=health_check&company_ids=100274,100359&ref_index_company_id=100001",ticker_analysis:"/index.php?context=health_check&portfolio_tickers=EQUI,DNB,TEL",weighted_portfolio:"/index.php?context=health_check&portfolio_tickers=AUSS,LSG,MOWI,SALM,BAKKA&portfolio_num_shares=100,100,100,200,10&ref_index_ticker=OSEBX",debug_mode:"/index.php?context=health_check&portfolio_id=39901&api_test=1",no_guide:"/index.php?context=health_check&portfolio_id=39901&api_guide=0"},parameters:{required:{context:{value:"health_check",description:"API context identifier"}},input_methods:{portfolio_id:{parameter:"portfolio_id",type:"integer",description:"Portfolio ID from MY_PORTFOLIO table (previously pid)",example:"?context=health_check&portfolio_id=39901",priority:1},watchlist_id:{parameter:"watchlist_id",type:"integer",description:"Watchlist ID from WATCHLIST table (previously wlid)",example:"?context=health_check&watchlist_id=12345",priority:2},company_ids:{parameter:"company_ids",type:"string",description:"Comma-separated list of company IDs (previously portCompanyIds)",example:"?context=health_check&company_ids=100274,100359",priority:3},portfolio_tickers:{parameter:"portfolio_tickers",type:"string",description:"Comma-separated list of ticker symbols (previously portTickers)",example:"?context=health_check&portfolio_tickers=EQUI,DNB,TEL",priority:3},weighted_portfolio:{parameters:["portfolio_tickers","portfolio_num_shares"],type:"string,string",description:"Ticker symbols with corresponding number of shares (previously portTickers + portNumShares)",example:"?context=health_check&portfolio_tickers=AUSS,LSG,MOWI,SALM,BAKKA&portfolio_num_shares=100,100,100,200,10",priority:3,note:"If portfolio_num_shares is not provided, portfolio will be equally weighted"}},optional:{ref_index_ticker:{type:"string",description:"Reference index ticker symbol (previously refIndexTicker)",example:"OSEBX"},ref_index_company_id:{type:"integer",description:"Reference index company ID for comparison (previously refIndexCompanyId)",default:"Auto-detected or OSEBX (100001)"},portfolio_num_shares:{type:"string",description:"Comma-separated number of shares for each ticker (previously portNumShares)",example:"100,100,100,200,10",note:"Must match order of tickers in portfolio_tickers parameter"},api_test:{type:"integer",description:"Enable test/debug mode (shows raw data structure)",values:[0,1],default:0},api_guide:{type:"integer",description:"Include this API guide in response",values:[0,1],default:1},sections:{type:"string",description:"Comma-separated list of sections to include in calcApiData response. Valid values are: health_data, pies, kpis, factor_diagram, correlation_analysis, portfolio_development_report, test_links.",values:{health_data:"Raw health calculation data (overall, elements, full report)",pies:"Pie chart data for all health categories",kpis:"Key performance indicators and metrics",factor_diagram:"Factor diagram SVG and metadata",correlation_analysis:"Correlation matrix analysis and data structures",portfolio_development_report:"Portfolio development and performance data",test_links:"Developer/test portfolio links (for testing only)"},examples:{correlation_analysis:"Only correlation data","correlation_analysis,pies":"Correlation and pie chart data",all_sections:"Leave empty or omit parameter to include all sections"},default:"All sections included",note:"Invalid section names will trigger an error response with a list of valid options. If omitted or empty, all sections are included."}}},response_structure:{port_type:"Portfolio type (myPortfolio, myWatchlist, url)",stat_port:"Portfolio statistics and health scores",stat_ref:"Reference index statistics",port_company:"Individual company data and scores",api_info:"API execution metadata",api_guide:"This usage guide (if api_guide=1)"},health_scoring:{description:"Portfolio health is calculated using weighted scores across multiple factors",factors:{num_stocks:{weight:2,description:"Number of stocks diversification"},volatility:{weight:2,description:"Portfolio volatility analysis"},liquidity:{weight:1,description:"Liquidity assessment"},equally_weighted:{weight:1,description:"Equal weighting analysis"},sector_diversification:{weight:1,description:"Sector spread analysis"},non_correlation:{weight:2,description:"Correlation analysis"},technical:{weight:2,description:"Technical analysis scores"},inside:{weight:1,description:"Insider trading analysis"}},total_weight:12,scale:"Scores typically range from 0-100 per factor"}},meta:{title:"Technical Analysis",description:"Technical analysis, signals, key figures and research."}};a.s(["correlationMatrixJson",0,g,"tableWithPopoverCode",0,f]),c()}catch(a){c(a)}},!1),77640,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(16170),f=b([e]);function g(){let a=`<div class="it_inlineChartTiny  w-[100px]"><!-- START.Element_FactorDiagram --><svg width="50" height="50"><defs>	<radialGradient id="fillFactorMostlyPositive50" cx="25" cy="25" r="18" gradientUnits="userSpaceOnUse">		<stop offset="0%" style="stop-color:#3fb145;stop-opacity:1"></stop>		<stop offset="100%" style="stop-color:#3fb145;stop-opacity:1"></stop>	</radialGradient></defs><ellipse class="ifgAxisTickCircles" cx="25" cy="25" rx="24" ry="24" style="stroke-width:1" /><ellipse  class="ifgAxisTickCircles" cx="25" cy="25" rx="15" ry="15" style="stroke-width:1" /><line x1="25" y1="25" x2="40" y2="5" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="10" y2="5" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="2" y2="33" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="25" y2="50" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="48" y2="33" style="stroke:rgb(180,180,180);stroke-width:1" /><path  d="M39,30 C41,24 41,13 36,9 C32,6 21,9 16,13 C11,17 9,24 11,30 C13,35 19,39 25,39 C31,39 37,35 39,30  Z" style="fill:url(#fillFactorMostlyPositive50);fill-opacity:0.85" /><path id="slice1" class="ifgTooltipSliceOpacityLight Technical901" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-90,25,25)"></path><path id="slice2" class="ifgTooltipSliceOpacityLight Quantitative1622" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-162,25,25)"></path><path id="slice3" class="ifgTooltipSliceOpacityLight Insider2343" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-234,25,25)"></path><path id="slice4" class="ifgTooltipSliceOpacityLight Stability3064" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-306,25,25)"></path><path id="slice5" class="ifgTooltipSliceOpacityLight Fundamental3785" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-378,25,25)"></path></svg><div class='factorGraphTooltip factorGraphTooltipLarge FGTooltipTop'><span></span></div><div class='factorGraphTooltipMobile factorGraphTooltipLarge'><span>mobile</span></div><!-- STOP.Element_FactorDiagram --></div>`;return(0,d.jsx)(e.TechAnalysisHeader,{price:{close:"125.50",profit_loss_percent:{sign:1,value:"+5.2%",is_badge:!0},price_date:"2024-01-15",price_date_long:"January 15, 2024"},static_info:{about_header_text:"About the Company",description:"A leading technology company specializing in cloud computing, artificial intelligence, and enterprise software solutions. The company has been at the forefront of digital transformation for over two decades, serving millions of customers worldwide.",description_suggested_clip_length:100,company_url:"example.com",source:"Company Website"},sectors:{sector:{id:"1",name:"Technology",link:"/sector/technology"},group:{id:"2",name:"Software",link:"/group/software"},industry:{id:"3",name:"Enterprise Software",link:"/industry/enterprise-software"}},recommendation:{type:"investtech",free_version:0,investtech:{score:"8",eval_code:2,eval_text:"Buy",color:"buy",color_tailwind:"text-green-600"}},factor_diagram_thumb:a,risk:{calculated:!0,liquidity:{text:"Good",level:"Low",score:88},volatility:{text:"Low",level:"Low",score:85},total:{icon:!1,text_long:"Low Risk",text_short:"Low",level:"Low",score:86,color:"green"}},labelAndTexts:{close:"Close",updated:"Updated",about_company:"About the Company",website:"Website",source:"Source",sector:"Sector",recommendation:"Recommendation",recommendation_card_help:["Investtech recommendation is based on technical analysis.","The score ranges from 1-9, where higher scores indicate stronger buy signals."]}})}[e]=f.then?(await f)():f;let h=`
'use client';

import { TechAnalysisHeader } from '@/components/custom-components/tech-analysis-header';
import {
  LabelsAndTexts,
  Price,
  Recommendation,
  Risk,
  Sectors,
  StaticInfo,
} from '@/lib/types/shared-components';

export function TechAnalysisHeaderDemo() {
  // Price information
  const samplePrice: Price = {
    close: '125.50',
    profit_loss_percent: {
      sign: 1,
      value: '+5.2%',
      is_badge: true,
    },
    price_date: '2024-01-15',
    price_date_long: 'January 15, 2024',
  };

  // Company static information
  const sampleStaticInfo: StaticInfo = {
    about_header_text: 'About the Company',
    description: 'Company description text...',
    description_suggested_clip_length: 100,
    company_url: 'example.com',
    source: 'Company Website',
  };

  // Sector classification
  const sampleSectors: Sectors = {
    sector: {
      id: '1',
      name: 'Technology',
      link: '/sector/technology',
    },
    group: {
      id: '2',
      name: 'Software',
      link: '/group/software',
    },
    industry: {
      id: '3',
      name: 'Enterprise Software',
      link: '/industry/enterprise-software',
    },
  };

  // Investment recommendation
  const sampleRecommendation: Recommendation = {
    type: 'investtech',
    free_version: 0,
    investtech: {
      score: '8',
      eval_code: 2,
      eval_text: 'Buy',
      color: 'buy',
      color_tailwind: 'text-green-600',
    },
  };

  // Risk assessment
  const sampleRisk: Risk = {
    calculated: true,
    liquidity: {
      text: 'Good',
      level: 'Low',
      score: 88,
    },
    volatility: {
      text: 'Low',
      level: 'Low',
      score: 85,
    },
    total: {
      icon: false,
      text_long: 'Low Risk',
      text_short: 'Low',
      level: 'Low',
      score: 86,
      color: 'green',
    },
  };

  // Labels and texts for internationalization
  const sampleLabelsAndTexts: LabelsAndTexts = {
    close: 'Close',
    updated: 'Updated',
    about_company: 'About the Company',
    website: 'Website',
    source: 'Source',
    sector: 'Sector',
    recommendation: 'Recommendation',
    recommendation_card_help: [
      'Investtech recommendation is based on technical analysis.',
      'The score ranges from 1-9, where higher scores indicate stronger buy signals.',
    ],
  };

  // Optional factor diagram thumbnail SVG
  const sampleFactorDiagramThumb = \`<!-- SVG content -->\`;

  return (
    <TechAnalysisHeader
      price={samplePrice}
      static_info={sampleStaticInfo}
      sectors={sampleSectors}
      recommendation={sampleRecommendation}
      factor_diagram_thumb={sampleFactorDiagramThumb}
      risk={sampleRisk}
      labelAndTexts={sampleLabelsAndTexts}
    />
  );
}
`;a.s(["TechAnalysisHeaderDemo",()=>g,"techAnalysisHeaderCode",0,h,"techAnalysisHeaderJson",0,{price:{close:"125.50",profit_loss_percent:{sign:1,value:"+5.2%",is_badge:!0},price_date:"2024-01-15",price_date_long:"January 15, 2024"},static_info:{about_header_text:"About the Company",description:"Company description text...",description_suggested_clip_length:100,company_url:"example.com",source:"Company Website"},sectors:{sector:{id:"1",name:"Technology",link:"/sector/technology"},group:{id:"2",name:"Software",link:"/group/software"},industry:{id:"3",name:"Enterprise Software",link:"/industry/enterprise-software"}},recommendation:{type:"investtech",free_version:0,investtech:{score:"8",eval_code:2,eval_text:"Buy",color:"buy",color_tailwind:"text-green-600"}},risk:{calculated:!0,liquidity:{text:"Good",level:"Low",score:88},volatility:{text:"Low",level:"Low",score:85},total:{icon:!1,text_long:"Low Risk",text_short:"Low",level:"Low",score:86,color:"green"}},labels_and_texts:{close:"Close",updated:"Updated",about_company:"About the Company",website:"Website",source:"Source",sector:"Sector",recommendation:"Recommendation",recommendation_card_help:["Investtech recommendation is based on technical analysis.","The score ranges from 1-9, where higher scores indicate stronger buy signals."]},factor_diagram_thumb:"SVG string containing factor diagram thumbnail"}]),c()}catch(a){c(a)}},!1),88299,a=>a.a(async(b,c)=>{try{a.i(87924);var d=a.i(59501),e=a.i(86352),f=a.i(63563);a.i(88782);var g=b([d,e]);[d,e]=g.then?(await g)():g,f.object({search:f.string().optional(),searchRight:f.string().optional(),framework:f.string({message:"Please select a framework."}),username:f.string().min(2,{message:"Username must be at least 2 characters."}),email:f.string().email({message:"Please enter a valid email address."}),password:f.string().min(8,{message:"Password must be at least 8 characters."}),bio:f.string().max(160,{message:"Bio must not be longer than 160 characters."}),role:f.string({message:"Please select a role."}),notifications:f.boolean({message:"Please set notifications preference."}),marketing:f.boolean({message:"Please set marketing preference."}),subscription:f.enum(["free","pro","enterprise"],{message:"Please select a subscription plan."}),terms:f.boolean().refine(a=>!0===a,{message:"You must accept the terms and conditions."})});let h=`import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/external-components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/external-components/form"
import { Input } from "@/components/external-components/input"
import { Textarea } from "@/components/external-components/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/external-components/select"
import { Checkbox } from "@/components/external-components/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/external-components/radio-group"
import { Switch } from "@/components/external-components/switch"
import { useToast } from "@/components/external-components/use-toast"

// Form validation schema
const formSchema = z.object({
  search: z.string().optional(),
  searchRight: z.string().optional(),
  framework: z.string({
    message: "Please select a framework.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  role: z.string({
    message: "Please select a role.",
  }),
  notifications: z.boolean({
    message: "Please set notifications preference.",
  }),
  marketing: z.boolean({
    message: "Please set marketing preference.",
  }),
  subscription: z.enum(["free", "pro", "enterprise"], {
    message: "Please select a subscription plan.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function FormExample() {
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      searchRight: "",
      framework: "",
      username: "",
      email: "",
      password: "",
      bio: "",
      notifications: false,
      marketing: false,
      terms: false,
    },
  })

  function onSubmit(values: FormValues) {
    try {
      // Handle form submission
      toast({
        title: "Form submitted successfully",
        description: "Your information has been saved.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Form {...form}>
        <form onSubmit={() => void form.handleSubmit(onSubmit)()} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormDescription>We'll never share your email with anyone else.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormDescription>Must be at least 8 characters long.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Brief description for your profile.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select your role in the organization.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Plan</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="free" />
                      </FormControl>
                      <FormLabel className="font-normal">Free</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="pro" />
                      </FormControl>
                      <FormLabel className="font-normal">Pro</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="enterprise" />
                      </FormControl>
                      <FormLabel className="font-normal">Enterprise</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Marketing Emails</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  <FormDescription>
                    You agree to our Terms of Service and Privacy Policy.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}`;a.s(["formExampleCode",0,h]),c()}catch(a){c(a)}},!1),79037,a=>a.a(async(b,c)=>{try{var d=a.i(87924),e=a.i(17853),f=a.i(90887),g=a.i(19721),h=a.i(72131),i=a.i(83792),j=a.i(80977),k=a.i(76632),l=a.i(90067),m=a.i(90351),n=a.i(76304),o=a.i(39376),p=a.i(73479),q=a.i(44153),r=a.i(16666),s=a.i(26862),t=a.i(56134),u=a.i(41261),v=a.i(69836),w=a.i(79052),x=a.i(9170),y=a.i(60557),z=a.i(80013),A=a.i(8013),B=a.i(93679),C=a.i(78740),D=a.i(23060),E=a.i(88032),F=a.i(88882),G=a.i(3761),H=a.i(78357),I=a.i(42574),J=a.i(75782),K=a.i(98787),L=a.i(4e3),M=a.i(88955),N=a.i(22511),O=a.i(5434),P=a.i(23032),Q=a.i(69999),R=a.i(64600),S=a.i(1780),T=a.i(7102),U=a.i(53932),V=a.i(3677),W=a.i(16985),X=a.i(26483),Y=a.i(77640),Z=a.i(88299),$=a.i(76130),_=b([f,i,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,W,X,Y,Z]);[f,i,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,W,X,Y,Z]=_.then?(await _)():_;let ac=(0,g.default)(async()=>{},{loadableGenerated:{modules:[87530]},ssr:!1}),ad=[{title:"Progress Bar Tooltip"},{title:"Progress Bar"},{title:"Table with Popover"},{title:"Chart Pie Donut"},{title:"Factor Diagram"},{title:"Tech Analysis Header"},{title:"Signals Section"},{title:"Basic Table"},{title:"Sortable Table"},{title:"Table with Links"},{title:"Table with Badges"},{title:"Portfolio Return Table"},{title:"Table with Actions"},{title:"Table with Tooltips"},{title:"Table Skeleton"},{title:"Table with Pagination"},{title:"Empty Table State"},{title:"Table without Header"},{title:"Research Table"},{title:"Table with single header"},{title:"Search Bar"},{title:"Button"},{title:"Input"},{title:"Textarea"},{title:"Switch"},{title:"Checkbox"},{title:"Radio Group"},{title:"Select"},{title:"Alert"},{title:"Alert Dialog"},{title:"Breadcrumb"},{title:"Avatar"},{title:"Badge"},{title:"Skeleton"},{title:"Dialog"},{title:"Drawer"},{title:"Hover Card"},{title:"Tooltip"},{title:"Command"},{title:"Card"},{title:"Accordion"},{title:"Menubar"},{title:"Sheet"},{title:"Aspect Ratio"},{title:"Combobox"},{title:"Dropdown Menu"},{title:"Toast"},{title:"Form"},{title:"Alphabetic Filter"},{title:"Paginator"},{title:"Spinner"},{title:"Custom Dropdown Menu"},{title:"Intra Page Menu (Table of Contents)"}];function aa({sectionIndex:a,children:b}){let{registerSection:c}=(0,j.useTableOfContentsContext)(),e=`section-${a}`;return(0,d.jsx)("div",{id:e,ref:a=>c(e,a),children:b})}function ab(){let a=0,b=h.default.useRef(null);return(0,h.useEffect)(()=>{let a=setTimeout(()=>{b.current?b.current.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo(0,0)},100);return()=>clearTimeout(a)},[]),(0,d.jsx)(j.TableOfContentsProvider,{sections:ad,children:(0,d.jsxs)("div",{className:"container mx-auto py-6",ref:b,children:[(0,d.jsx)("div",{className:"mb-8",children:(0,d.jsx)($.Link,{href:"/docs/table",className:"text-primary hover:text-primary-text-hover font-medium underline",children:"Table"})}),(0,d.jsxs)("header",{children:[(0,d.jsx)("h1",{className:"mb-8 text-4xl font-bold",children:"Components"}),(0,d.jsx)("p",{className:"text-muted-foreground mb-8",children:"Browse and test all available UI components with interactive examples and code snippets."})]}),(0,d.jsxs)("div",{className:"flex gap-8",children:[(0,d.jsxs)("main",{className:"grid flex-1 gap-8",role:"main","aria-label":"Component examples",children:[(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between space-y-2",children:[(0,d.jsx)(e.CardTitle,{children:"Progress Bar Tooltip"}),(0,d.jsx)(t.CodeExampleDialog,{title:"Progress Bar Tooltip Example",description:"Progress bar tooltip component with customizable indicator color.",code:T.progressBarTooltipCode})]}),(0,d.jsx)(e.CardDescription,{children:"Progress bar with tooltip that appears on hover."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(T.ProgressBarTooltipDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between space-y-2",children:[(0,d.jsx)(e.CardTitle,{children:"Progress Bar"}),(0,d.jsx)(t.CodeExampleDialog,{title:"Progress Bar Example",description:"Progress bar component with customizable indicator color.",code:D.progressBarExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Simple progress bar component with customizable indicator color."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(D.ProgressBarDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between space-y-2",children:[(0,d.jsx)(e.CardTitle,{children:"Table with Popover"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Table with Popover Example",description:"Table cells with interactive popover tooltips that work on both desktop (hover) and mobile (click).",code:X.tableWithPopoverCode})]}),(0,d.jsx)(e.CardDescription,{children:"Interactive table cells with popover tooltips. Hover on desktop or click on mobile/tablet to view additional information."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(k.CorrelationMatrix,{data:X.correlationMatrixJson.correlation_analysis})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between space-y-2",children:[(0,d.jsx)(e.CardTitle,{children:"Chart Pie Donut"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Pie Donut Chart Example",description:"Here's how to use the Pie Donut Chart component in your code.",code:S.pieDonutChartCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Pie Donut Chart JSON",description:"API response structure for pie donut chart.",json:JSON.stringify(S.pieDonutChartJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"A donut chart component that displays data in a circular pie format with a hollow center. Features custom labels, tooltips, and category legends. Uses Recharts library for rendering."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(S.ChartPieDonutDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between space-y-2",children:[(0,d.jsx)(e.CardTitle,{children:"Factor Diagram"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Factor Diagram Example",description:"Here's how to use the Factor Diagram component in your code.",code:P.factorDiagramCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Factor Diagram JSON",description:"API response structure for factor diagram with SVG and tooltips.",json:JSON.stringify(P.factorDiagramJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"A radial diagram component that visualizes stock factors (Technical, Quantitative, Insider, Stability, Fundamental) in a circular format. Features interactive tooltips on hover (desktop) or bottom sheets on click (mobile) that display detailed information about each factor including scores, values, and descriptions."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(P.FactorDiagramDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between space-y-2",children:[(0,d.jsx)(e.CardTitle,{children:"Tech Analysis Header"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Tech Analysis Header Example",description:"Here's how to use the Tech Analysis Header component in your code.",code:Y.techAnalysisHeaderCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Tech Analysis Header JSON",description:"API response structure for tech analysis header with price, company info, sectors, recommendation, and risk data.",json:JSON.stringify(Y.techAnalysisHeaderJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"A comprehensive header component for technical analysis pages that displays company price information, description, sector classification, Investtech recommendation score with factor diagram thumbnail, and risk level indicator. Responsively adapts layout for mobile and desktop views with different column arrangements."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(Y.TechAnalysisHeaderDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between space-y-2",children:[(0,d.jsx)(e.CardTitle,{children:"Signals Section"}),(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Signals Section Example",description:"Here's how to use the Signals Section component in your code.",code:U.signalsSectionCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Signals Section JSON",description:"API response structure for signals section with signal cards, statistics, and help data.",json:JSON.stringify(U.signalsSectionJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"A grid-based section component that displays technical analysis signals as interactive cards. Each signal card shows a chart image, statistics badge with annual excess return, and signal count. Features responsive grid layout (2 columns on mobile, up to 5 on desktop), clickable cards that navigate to signal documentation, and a help dialog with additional information. Supports both light and dark mode images for different viewport sizes."})]}),(0,d.jsx)(e.CardContent,{})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Basic Table"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Basic Table Example",description:"Basic table with header, body, footer, and caption.",code:W.basicTableCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Stocks Table JSON",description:"API response structure for stocks table (stocks-table.tsx, indices-table.tsx).",json:JSON.stringify(W.stocksTableJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Basic table structure with TableHeader, TableBody."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.BasicTableDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Sortable Table"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Sortable Table Example",description:"Table with sortable columns using arrow indicators.",code:W.sortableTableCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Top50 Table JSON",description:"API response structure for top50 table with score-based sorting.",json:JSON.stringify(W.top50TableJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Click on column headers to sort. Supports ascending and descending order. The column header is clickable and will sort the table by the column. The current sorting state is indicated by the arrow icon in the column header. The column which is currently sorted is highlighted in the header."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.SortableTableDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table with Links"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Table with Links Example",description:"Table cells with clickable links for navigation.",code:W.tableWithLinksCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Watchlist Table JSON",description:"API response structure for watchlist with company links.",json:JSON.stringify(W.watchlistTableJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Clickable cells that navigate to detail pages."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithLinksDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table with Badges"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Table with Badges Example",description:"Table using badges for status indicators.",code:W.tableWithBadgesCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Latest Reports JSON",description:"API response for today's case latest reports with buy/sell badges.",json:JSON.stringify(W.latestReportsTableJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Using badges for buy/sell signals and status indicators."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithBadgesDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Portfolio Return Table"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Portfolio Return Table Example",description:"Compact table showing portfolio returns with badges.",code:W.tableWithBadgesCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Portfolio Holdings JSON",description:"API response for model portfolio with holdings and return data.",json:JSON.stringify(W.portfolioHoldingsTableJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Compact table format for displaying portfolio performance metrics."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithReturnDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table with Actions"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Table with Actions Example",description:"Table with action buttons for delete, edit operations.",code:W.tableWithActionsCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"My Notes Table JSON",description:"API response for my notes table with delete actions.",json:JSON.stringify(W.myNotesTableJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Table rows with delete and edit action buttons."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithActionsDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table with Tooltips"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Table with Tooltips Example",description:"Table cells with tooltips for additional information.",code:W.basicTableCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"All Table JSON Examples",description:"Complete collection of all table JSON structures used in the project.",json:JSON.stringify(W.allTableJsonExamples,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Hover over cells to see additional information."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithTooltipsDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table Skeleton"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Table Skeleton Example",description:"Loading skeleton for tables while data is being fetched.",code:W.tableSkeletonCode})]}),(0,d.jsx)(e.CardDescription,{children:"Loading skeleton animation shown while table data is loading."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableSkeletonDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table with Pagination"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Table with Pagination Example",description:"Table with pagination controls for large datasets.",code:W.tableWithPaginationCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Table with Pagination JSON",description:"API response structure for paginated tables with page and limit parameters.",json:JSON.stringify(W.tableWithPaginationJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Paginated table component designed for handling large datasets efficiently. The table automatically splits data into multiple pages, allowing users to navigate through results using previous/next buttons and direct page number selection. Features include customizable page size options (e.g., 10, 25, 50, 100 items per page), total count display, and intuitive navigation controls. This approach lets the API accept 'limit' & 'page' to fetch the data from the server and improves performance by rendering only the current page's data, reduces initial load time, and provides a better user experience when working with extensive data collections."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithPaginationDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Empty Table State"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Empty Table Example",description:"How to display an empty state when no data is available.",code:W.emptyTableCode})]}),(0,d.jsx)(e.CardDescription,{children:"Display state when table has no data."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.EmptyTableDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table without Header"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Table without Header Example",description:"Table with no header row - just data rows.",code:W.tableWithoutHeaderCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Table without Header JSON",description:"API response structure for tables without headers.",json:JSON.stringify(W.tableWithoutHeaderJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Table structure without TableHeader component."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithoutHeaderDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Research Table"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Research Table Example",description:"Research table",code:W.researchTableCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Research Table JSON",description:"API response structure for research table.",json:JSON.stringify(W.researchTableJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Table structure for research pages."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.ResearchTableDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Table with single header"})," ",(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsx)(t.CodeExampleDialog,{title:"Table with single header Example",description:"Table with single header",code:W.tableWithSingleHeaderCode}),(0,d.jsx)(B.JsonExampleDialog,{title:"Table with single header JSON",description:"API response structure for table with single header.",json:JSON.stringify(W.tableWithSingleHeaderJson,null,2)})]})]}),(0,d.jsx)(e.CardDescription,{children:"Table structure with single header."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(W.TableWithSingleHeaderDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Search Bar"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Search Bar Component Example",description:"Here's how to use the Search Bar component in your code.",code:F.searchBarExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Search input with icon and placeholder."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(F.SearchBarDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Button"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Button Component Example",description:"Here's how to use the Button component in your code.",code:q.buttonExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Various button styles and variants."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(q.ButtonDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Input"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Input Component Example",description:"Here's how to use the Input component in your code.",code:A.inputExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Text input field with label."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(A.InputDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Textarea"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Textarea Component Example",description:"Here's how to use the Textarea component in your code.",code:K.textareaExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Multi-line text input field."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(K.TextareaDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Switch"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Switch Component Example",description:"Here's how to use the Switch component in your code.",code:J.switchExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Toggle switch with label."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(J.SwitchDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Checkbox"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Checkbox Component Example",description:"Here's how to use the Checkbox component in your code.",code:s.checkboxExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Checkbox with label."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(s.CheckboxDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Radio Group"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Radio Group Component Example",description:"Here's how to use the Radio Group component in your code.",code:E.radioGroupExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Radio button group with labels."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(E.RadioGroupDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Select"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Select Component Example",description:"Here's how to use the Select component in your code.",code:G.selectExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Dropdown select with options."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(G.SelectDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Alert"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Alert Component Example",description:"Here's how to use the Alert component in your code.",code:m.alertExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Alert message with title and description."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(m.AlertDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Breadcrumb"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Breadcrumb Component Example",description:"Here's how to use the Breadcrumb component in your code.",code:p.breadcrumbExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Navigation breadcrumb trail."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(p.BreadcrumbDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Avatar"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Avatar Component Example",description:"Here's how to use the Avatar component in your code.",code:n.avatarExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"User avatar with fallback."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(n.AvatarDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Badge"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Badge Component Example",description:"Here's how to use the Badge component in your code.",code:o.badgeExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Various badge styles."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(o.BadgeDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Skeleton"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Skeleton Component Example",description:"Here's how to use the Skeleton component in your code.",code:I.skeletonExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Loading skeleton animation."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(I.SkeletonDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Dialog"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Dialog Component Example",description:"Here's how to use the Dialog component in your code.",code:w.dialogExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Modal dialog with form."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(w.DialogDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Drawer"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Drawer Component Example",description:"Here's how to use the Drawer component in your code.",code:x.drawerExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Side drawer with form."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(x.DrawerDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Hover Card"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Hover Card Component Example",description:"Here's how to use the Hover Card component in your code.",code:z.hoverCardExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Card that appears on hover."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(z.HoverCardDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Tooltip"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Tooltip Component Example",description:"Here's how to use the Tooltip component in your code.",code:M.tooltipExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Tooltip that appears on hover."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(M.TooltipDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Command"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Command Component Example",description:"Here's how to use the Command component in your code.",code:v.commandExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Command palette with search."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(v.CommandDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Card"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Card Component Example",description:"Here's how to use the Card component in your code.",code:r.cardExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Card component with header, content, and footer."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(r.CardDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Accordion"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Accordion Component Example",description:"Here's how to use the Accordion component in your code.",code:l.accordionExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Collapsible accordion sections."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(l.AccordionDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Menubar"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Menubar Component Example",description:"Here's how to use the Menubar component in your code.",code:C.menubarExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Navigation menubar with dropdowns."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(C.MenubarDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Sheet"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Sheet Component Example",description:"Here's how to use the Sheet component in your code.",code:H.sheetExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Side sheet with form."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(H.SheetDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Combobox"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Combobox Component Example",description:"Here's how to use the Combobox component in your code.",code:u.comboboxExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Combobox with search and selection."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(u.ComboboxDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Dropdown Menu"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Dropdown Menu Component Example",description:"Here's how to use the Dropdown Menu component in your code.",code:y.dropdownMenuExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Dropdown menu with items."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(y.DropdownMenuDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Toast"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Toast Component Example",description:"Here's how to use the Toast component in your code.",code:L.toastExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Toast notification system."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(L.ToastDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Form"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Form Component Example",description:"Here's how to use the Form component in your code.",code:Z.formExampleCode})]}),(0,d.jsx)(e.CardDescription,{children:"Form with validation and various input types."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(ac,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Alphabetic Filter"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Alphabetic Filter Component Example",description:"Here's how to use the Alphabetic Filter component in your code.",code:N.alphabeticFilterCode})]}),(0,d.jsx)(e.CardDescription,{children:'Alphabetic filter with all letters and "All" option.'})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(N.AlphabeticFilterDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Paginator"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Paginator Component Example",description:"Here's how to use the Paginator component in your code.",code:R.paginatorCode})]}),(0,d.jsx)(e.CardDescription,{children:"Paginator with page size dropdown."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(R.PaginatorDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Spinner"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Spinner Component Example",description:"Here's how to use the Spinner component in your code.",code:V.spinnerCode})]}),(0,d.jsx)(e.CardDescription,{children:"Spinner component."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(V.default,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Custom Dropdown Menu"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Dropdown Menu Component Example",description:"Here's how to use the Dropdown Menu component in your code.",code:O.dropdownMenuCode})]}),(0,d.jsx)(e.CardDescription,{children:"Custom dropdown menu with items."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)(O.DropdownMenuComponentDemo,{})})]})}),(0,d.jsx)(aa,{sectionIndex:a++,children:(0,d.jsxs)(e.Card,{className:"p-5",children:[(0,d.jsxs)(e.CardHeader,{children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsx)(e.CardTitle,{children:"Intra Page Menu (Table of Contents)"})," ",(0,d.jsx)(t.CodeExampleDialog,{title:"Intra Page Menu Component Example",description:"Here's how to use the Intra Page Menu (Table of Contents) component in your code.",code:Q.intraPageMenuCode})]}),(0,d.jsx)(e.CardDescription,{children:"Sticky table of contents navigation component that automatically highlights the active section as you scroll. Features smooth scrolling, active section tracking, and responsive design. Perfect for long-form content with multiple sections."})]}),(0,d.jsx)(e.CardContent,{children:(0,d.jsx)("div",{className:"min-h-[600px]",children:(0,d.jsx)(Q.IntraPageMenuDemo,{})})})]})})]}),(0,d.jsx)(i.default,{sections:ad,title:"Components"})]}),(0,d.jsx)(f.Toaster,{})]})})}a.s(["default",()=>ab]),c()}catch(a){c(a)}},!1)];

//# sourceMappingURL=_f540adf3._.js.map