import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


function ImportantLinks() {
 

  return (
    <div>

<div className="bg-white h-full rounded-xl">

<h2 className="text-xl font-semibold pl-5 pt-4 text-gray-900">Important Links</h2>
         <div className="p-6 bg-white  ">
        


 

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 border border-gray-200  rounded-lg p-5 h-[550px] overflow-y-auto ">
   <style>
  {`
   
    div::-webkit-scrollbar {
      width: 8px;
    }
    div::-webkit-scrollbar-thumb {
      background-color: #1E40AF; 
      border-radius: 4px;
    }
    div::-webkit-scrollbar-thumb:hover {
      background-color: #1B3A99; 
    }

    /* Firefox */
    div {
      scrollbar-width: thin;
      scrollbar-color: #1E40AF transparent;
    }
  `}
</style>
        {/* LinkedIn */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">LinkedIn</label>
          <Input placeholder="Enter LinkedIn URL" id="linkedin"  />
          <Button
            className="w-24"
           
          >
            Update
          </Button>
        </div>

        {/* Slack */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Slack</label>
          <Input placeholder="Enter Slack URL" id="slack" />
          <Button
            className="w-24"
            
          >
            Update
          </Button>
        </div>

        {/* Website */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Website</label>
          <Input placeholder="Enter Website URL" id="website" />
          <Button
            className="w-24"
           
          >
            Update
          </Button>
        </div>

        {/* ClickUp */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Click Up</label>
          <Input placeholder="Enter ClickUp URL" id="clickup" />
          <Button
            className="w-24"
           
          >
            Update
          </Button>
        </div>

        {/* Instagram */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Instagram</label>
          <Input placeholder="Enter Instagram URL" id="instagram" />
          <Button
            className="w-24"
          
          >
            Update
          </Button>
        </div>

        {/* Trello */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Trello</label>
          <Input placeholder="Enter Trello URL" id="trello" />
          <Button
            className="w-24"
           
          >
            Update
          </Button>
        </div>

        {/* Company Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Company Email</label>
          <Input placeholder="Enter Company Email" id="companyEmail" />
          <Button
            className="w-24"
          
          >
            Update
          </Button>
        </div>

        {/* HR Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">HR Email</label>
          <Input placeholder="Enter HR Email" id="hrEmail" />
          <Button
            className="w-24"
           
          >
            Update
          </Button>
        </div>

        
      </div>
      </div>
      



      
    </div>
</div>


   
  );
}

export default ImportantLinks;