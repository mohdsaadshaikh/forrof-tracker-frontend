import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export const ProfileHeader = ({
  name,
  email,
  role,
  avatarUrl,
}: ProfileHeaderProps) => {
  const [avatar, setAvatar] = useState(avatarUrl);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024)
      return toast.error("File must be less than 5MB");

    if (!file.type.startsWith("image/"))
      return toast.error("Invalid image selected");

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setPreviewOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmUpload = () => {
    if (previewImage) {
      setAvatar(previewImage);
      toast.success("Avatar updated");
      setPreviewOpen(false);
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };

  const handleCancel = () => {
    setPreviewOpen(false);
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleRemoveAvatar = () => {
    setAvatar(undefined);
    toast.success("Avatar removed");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <>
      <div className="rounded-xl border bg-card/30 backdrop-blur-sm p-8 flex items-center gap-8 max-w-2xl">
        <div className="relative">
          <Avatar className="w-28 h-28 border border-border rounded-full shadow-sm">
            <AvatarImage src={avatar} className="object-cover" />
            <AvatarFallback className="text-3xl font-medium bg-muted">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 w-9 h-9 flex items-center justify-center bg-primary text-white rounded-full cursor-pointer shadow-md hover:scale-105 transition"
          >
            <Camera className="w-4 h-4" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>

          {avatar && (
            <button
              onClick={handleRemoveAvatar}
              className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center bg-destructive text-white rounded-full shadow hover:scale-105 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">{name}</h2>
          <p className="text-muted-foreground">{email}</p>

          <span className="inline-flex items-center text-sm px-3 py-1 mt-2 rounded-md bg-muted font-medium">
            {role}
          </span>
        </div>
      </div>

      {/* Avatar Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Avatar</DialogTitle>
            <DialogDescription>
              Review and confirm your new avatar.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center py-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={previewImage || ""} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </div>

          {selectedFile && (
            <p className="text-sm text-muted-foreground text-center">
              {selectedFile.name}
            </p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUpload}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
