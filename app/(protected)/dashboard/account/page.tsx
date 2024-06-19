import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default async function AccountPage() {
  const session = await auth();
  if (!session || !session.user) return null;
  const userInfo = session?.user;
  return (
    <div>
      <div className="grid max-w-7xl grid-cols-1 gap-5 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="font-semibold leading-7">Personal Information</h2>
          <p>Use a permanent address where you can receive mail.</p>
        </div>
        <form action="" className="col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-8">
              <Avatar className="size-20 rounded-lg">
                <AvatarFallback>{session.user?.email?.[0]}</AvatarFallback>
                {session?.user?.image ? (
                  <AvatarImage src={session.user.image} />
                ) : (
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                      userInfo?.name || "null"
                    }`}
                  />
                )}
              </Avatar>
              <div>
                <Button>Change Avatar</Button>
                <p className="mt-2 text-sm">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            <div className="col-span-3">
              <Label>Name</Label>
              <Input defaultValue={userInfo?.name || ""} />
            </div>
            <div className="col-span-3">
              <Label>Lastname</Label>
              <Input defaultValue={userInfo?.lastname || ""} />
            </div>
            <div className="col-span-full">
              <Label>Email address</Label>
              <Input disabled defaultValue={userInfo?.email || ""} />
            </div>
          </div>
          <div className="mt-4 flex">
            <Button>Save</Button>
          </div>
        </form>
      </div>
      <Separator />
      <div className="grid max-w-7xl grid-cols-1 gap-5 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="font-semibold leading-7">Change password</h2>
          <p>Update your password associated with your account.</p>
        </div>
        <form action="" className="col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <Label>Current password</Label>
              <Input />
            </div>
            <div className="col-span-full">
              <Label>New password</Label>
              <Input />
            </div>
            <div className="col-span-full">
              <Label>Confirm password</Label>
              <Input />
            </div>
          </div>
          <div className="mt-4 flex">
            <Button>Save</Button>
          </div>
        </form>
      </div>
      <Separator />
      <div className="grid max-w-7xl grid-cols-1 gap-5 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="font-semibold leading-7">Delete account</h2>
          <p>
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>
        <form action="" className="col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:max-w-xl sm:grid-cols-6">
            <Button className="w-fit" variant={"destructive"}>
              Yes, delete my account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
