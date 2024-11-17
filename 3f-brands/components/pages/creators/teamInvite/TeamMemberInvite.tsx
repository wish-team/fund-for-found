import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  SelectSection,
} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { Plus, Pencil, Trash } from "lucide-react";
import { MdOutlineDone } from "react-icons/md";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  description: string;
}

interface FormData extends TeamMember {}

interface PreviewCardProps {
  member: TeamMember;
  index?: number;
  showEdit?: boolean;
  onEdit?: (member: TeamMember, index: number) => void;
  onDelete?: (index: number) => void;
}

const STORAGE_KEY = "teamMembers";
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const ROLE_OPTIONS = [
  { label: "Admin", value: "Admin" },
  { label: "Teammate", value: "Teammate" },
] as const;
const MIN_DESCRIPTION_LENGTH = 80;

export default function TeamMemberInvite(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [invitedMember, setInvitedMember] = useState<TeamMember | null>(null);
  // const [editingIndex, setEditingIndex] = useState<number | null>(null);
  // const [descriptionError, setDescriptionError] = useState<string>("");
  // const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
  //   null
  // );
  // const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
  //   const saved = localStorage.getItem(STORAGE_KEY);
  //   return saved ? JSON.parse(saved) : [];
  // });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTeamMembers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamMembers));
    }
  }, [teamMembers]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    email: "",
    description: "",
  });

  const handleSelectClick = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
    setIsSelectOpen(false);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teamMembers));
  }, [teamMembers]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (formData.description.length < MIN_DESCRIPTION_LENGTH) {
      setDescriptionError(
        `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters long`
      );
      return;
    }

    if (editingIndex !== null) {
      const updatedMembers = [...teamMembers];
      updatedMembers[editingIndex] = formData;
      setTeamMembers(updatedMembers);
      setEditingIndex(null);
    } else {
      setTeamMembers((prev) => [...prev, formData]);
      setInvitedMember(formData);
      setShowInviteModal(true);
    }

    setIsOpen(false);
    setFormData({
      name: "",
      role: "",
      email: "",
      description: "",
    });
    setDescriptionError("");
  };

  const handleEdit = (member: TeamMember, index: number): void => {
    setFormData(member);
    setEditingIndex(index);
    setIsOpen(true);
  };

  const handleDelete = (index: number): void => {
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  const resetForm = (): void => {
    setIsOpen(false);
    setEditingIndex(null);
    setFormData({
      name: "",
      role: "",
      email: "",
      description: "",
    });
    setDescriptionError("");
  };

  const DescriptionText: React.FC<{
    description: string;
    index?: number;
  }> = ({ description, index }) => {
    const isExpanded = expandedCardIndex === index;
    const shouldShowReadMore = description.length > 100;

    return (
      <p className="text-sm text-light1 mt-4">
        {isExpanded ? description : `${description.slice(0, 100)}...`}
        {typeof index === "number" && shouldShowReadMore && (
          <Button
            color="secondary"
            className="m-0 p-0 text-sm text-primary200 hover:text-primary"
            onPress={() => setExpandedCardIndex(isExpanded ? null : index)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </Button>
        )}
      </p>
    );
  };

  const PreviewCard: React.FC<PreviewCardProps> = ({
    member,
    index,
    showEdit = true,
    onEdit,
    onDelete,
  }) => (
    <div className="bg-white flex flex-col justify-between rounded-lg border border-gray-200 overflow-hidden h-[400px] hover:border-purple-500 w-[250px] md:min-w-[250px]">
      <div className="p-6">
        <div className="flex justify-end">
          {showEdit && typeof index === "number" && (
            <div className="flex gap-2">
              <Button
                isIconOnly
                variant="light"
                onPress={() => onEdit?.(member, index)}
                className="text-gray-400 hover:text-gray-600 text-right"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                onPress={() => onDelete?.(index)}
                className="text-gray-400 hover:text-gray-600 text-right"
                disabled={member.role === "Admin"}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
          <div className="w-16 mx-auto h-16 bg-light4 border-4 border-primary100 rounded-2xl flex items-center justify-center">
            <FaUser className="w-6 h-6 text-primary100" />
          </div>

        <div className="flex flex-col items-center">
          <h3 className="text-xl py-2 text-center font-medium text-gray2">
            {member.name || "Name"}
          </h3>
          <span className="text-sm bg-light3 px-3 py-1 rounded-full text-gray4 font-light">
            {member.role || "Role"}
          </span>
        </div>

        <DescriptionText
          description={member.description || "Description"}
          index={typeof index === "number" ? index : undefined}
        />
      </div>

      <div className="bg-light3 px-6 py-4">
        <div className="flex justify-between border-b border-light2 pb-2 text-sm mb-2">
          <span className="text-gray2 font-medium">Created</span>
          <span className="font-light">
            {member.role === "Admin" ? "1 brands" : "0 brands"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray2 font-medium">Contributed</span>
          <span className="font-light">0 projects</span>
        </div>
      </div>
    </div>
  );

  const AddMemberCard: React.FC = () => (
    <div className="min-w-[250px] md:min-w-[250px] flex-shrink-0">
      <Button
        onPress={() => setIsOpen(true)}
        className="w-full h-full min-h-[400px] bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
      >
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <span className="text-xl font-medium text-gray-900">
          Invite team member
        </span>
      </Button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="max-w-[1048px] mx-auto relative">
        <div className="flex flex-row gap-2 overflow-x-auto">
          <div className="sticky left-0 z-10 bg-white">
            <AddMemberCard />
          </div>
          <div className="flex gap-3">
            {teamMembers.map((member, index) => (
              <PreviewCard
                key={index}
                member={member}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        backdrop="blur"
        className="bg-white rounded-lg shadow p-4"
        isOpen={isOpen}
        onClose={resetForm}
        size="3xl"
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h2 className="text-2xl font-medium text-gray2">
                {editingIndex !== null
                  ? "Edit team member"
                  : "Invite team member"}
              </h2>
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                <div className="space-y-4 mt-12">
                  <Input
                    className="border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />

                  <Select
                    placeholder="Select role"
                    className="border border-light3 text-gray4 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                    selectedKeys={formData.role ? [formData.role] : []}
                    onChange={handleSelectChange}
                    isOpen={isSelectOpen}
                    onOpenChange={setIsSelectOpen}
                    onClick={handleSelectClick}
                    classNames={{
                      trigger: "w-full",
                      popover: "w-full max-w-[100%]",
                    }}
                  >
                    <SelectSection className="bg-white border birder-light3 rounded-lg shadow">
                      {ROLE_OPTIONS.map((role) => (
                        <SelectItem
                          key={role.value}
                          value={role.value}
                          className="w-full bg-white text-gray4 text-sm hover:bg-primary50"
                          onClick={() => setIsSelectOpen(false)}
                        >
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectSection>
                  </Select>

                  <Input
                    type="email"
                    className="border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />

                  <div>
                    <Textarea
                      placeholder="Description"
                      className="border border-light3 min-h-[110px] rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                      value={formData.description}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                        setDescriptionError("");
                      }}
                      minRows={4}
                      required
                      errorMessage={descriptionError}
                      isInvalid={!!descriptionError}
                    />
                    <div className="text-xs text-light1">
                      {formData.description.length}/{MIN_DESCRIPTION_LENGTH}{" "}
                      characters minimum
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <PreviewCard member={formData} showEdit={false} />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                className="bg-light4 text-gray4 font-light rounded-lg border border-light2 text-xs hover:border-purple-500 hover:bg-primary50"
                variant="light"
                onPress={resetForm}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
                color="secondary"
                type="submit"
              >
                {editingIndex !== null ? "Update" : "Save"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal
        backdrop="blur"
        className="bg-white rounded-lg shadow"
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        size="sm"
      >
        <ModalContent>
          <ModalBody>
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <MdOutlineDone />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                We have sent an invitation email to
              </h3>
              <p className="text-purple-600 text-xl font-medium mb-4">
                {invitedMember?.name}
              </p>
              <Button
                color="secondary"
                variant="light"
                onPress={() => setShowInviteModal(false)}
              >
                Ok, continue
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
