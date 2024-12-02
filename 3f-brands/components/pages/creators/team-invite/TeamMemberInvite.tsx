import React, { useState } from "react";
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
  Selection,
} from "@nextui-org/react";
import { MdOutlineDone } from "react-icons/md";

import { useTeamMembers } from "./hooks/useTeamMembers";
import { PreviewCard } from "./components/PreviewCard";
import { AddMemberCard } from "./components/AddMemberCard";
import { TeamMember, FormData } from "./types/team";
import { ROLE_OPTIONS, MIN_DESCRIPTION_LENGTH } from "./utils/constants";
import { validateDescription, validateEmail } from "./utils/validation";
import CreatorsTitle from "../title/CreatorsTitle";

export default function TeamMemberInvite(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [invitedMember, setInvitedMember] = useState<TeamMember | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } =
    useTeamMembers();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "Teammate",
    email: "",
    description: "",
  });

  const handleRoleChange = (keys: Selection) => {
    const selectedRole = Array.from(keys)[0] as "Admin" | "Teammate";
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
    setIsSelectOpen(false);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Validate description
    const descError = validateDescription(formData.description);
    if (descError) {
      setDescriptionError(descError);
      return;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (editingIndex !== null) {
      updateTeamMember(editingIndex, formData);
      setEditingIndex(null);
    } else {
      addTeamMember(formData);
      setInvitedMember(formData);
      setShowInviteModal(true);
    }

    resetForm();
  };

  const resetForm = (): void => {
    setIsOpen(false);
    setEditingIndex(null);
    setFormData({
      name: "",
      role: "Teammate",
      email: "",
      description: "",
    });
    setDescriptionError("");
    setEmailError("");
  };

  return (
    <div>
      <div className="mx-auto relative">
        <CreatorsTitle title="Team" />
        <div className="flex flex-col md:flex-row gap-2 overflow-x-auto">
          <div className="w-full md:w-auto md:sticky md:left-0 md:z-10 md:bg-white order-1 md:order-none mb-4 md:mb-0">
            <AddMemberCard onAddMember={() => setIsOpen(true)} />
          </div>
          <div className="flex flex-col md:flex-row gap-3 items-center w-full">
            {teamMembers.map((member, index) => (
              <PreviewCard
                key={index}
                member={member}
                index={index}
                onEdit={(member, index) => {
                  setFormData(member);
                  setEditingIndex(index);
                  setIsOpen(true);
                }}
                onDelete={deleteTeamMember}
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
                    selectedKeys={
                      formData.role ? new Set([formData.role]) : new Set()
                    }
                    onSelectionChange={handleRoleChange}
                    className="border border-light3 text-gray4 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                    isOpen={isSelectOpen}
                    onOpenChange={(open) => setIsSelectOpen(open)}
                  >
                    <SelectSection className="bg-white rounded-lg shadow text-light1 text-sm ">
                      {ROLE_OPTIONS.map((role) => (
                        <SelectItem
                          key={role.value}
                          value={role.value}
                          textValue={role.label}
                          className="hover:bg-primary50"
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
                    errorMessage={emailError}
                    isInvalid={!!emailError}
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
              <div className="w-16 h-16  border-4 border-primary300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MdOutlineDone className="text-primary300 text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                We have sent an invitation email to
              </h3>
              <p className="text-primary300 text-xl font-medium mb-4">
                {invitedMember?.name}
              </p>
              <Button
                variant="light"
                className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
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
