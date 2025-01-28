import React from "react";
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

import { PreviewCard } from "./components/PreviewCard";
import { AddMemberCard } from "./components/AddMemberCard";
import { MIN_DESCRIPTION_LENGTH } from "./utils/constants";
import { validateDescription, validateEmail } from "./utils/validation";
import CreatorsTitle from "../title/CreatorsTitle";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useTeamStore } from "./store/tramStore";
import { useTranslation } from "react-i18next";

export default function TeamMemberInvite(): JSX.Element {
  const { t, i18n } = useTranslation(); 
  const isRTL = i18n.dir() === "rtl";
  const inputClassName = `border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500 ${
    isRTL ? 'text-right' : 'text-left'
  }`;

  const textareaClassName = `border border-light3 min-h-[110px] rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500 ${
    isRTL ? 'text-right' : 'text-left'
  }`;



  const {
    teamMembers,
    formData,
    isModalOpen,
    isSelectOpen,
    showInviteModal,
    invitedMember,
    editingIndex,
    descriptionError,
    emailError,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    setFormData,
    resetForm,
    setModalOpen,
    setSelectOpen,
    setShowInviteModal,
    setInvitedMember,
    setEditingIndex,
    setDescriptionError,
    setEmailError,
  } = useTeamStore();

  const handleRoleChange = (keys: Selection) => {
    const selectedRole = Array.from(keys)[0] as "Admin" | "Teammate";
    setFormData({ role: selectedRole });
    setSelectOpen(false);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const descError = validateDescription(formData.description);
    if (descError) {
      setDescriptionError(
        t("teamMember.form.validation.description", {
          length: MIN_DESCRIPTION_LENGTH,
        })
      );
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError(t("translation:teamMember.form.validation.email"));
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

  return (
    <AuthWrapper>
      {(user) => (
        <div>
          <div className="mx-auto relative">
            <CreatorsTitle title={t("translation:teamMember.creators.team")} />
            <div className="flex flex-col md:flex-row gap-2 overflow-x-auto">
              {user && (
                <div className="w-full md:w-auto md:sticky md:left-0 md:z-10 md:bg-white order-1 md:order-none mb-4 md:mb-0">
                  <AddMemberCard onAddMember={() => setModalOpen(true)} />
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-3 items-center w-full">
                {teamMembers.map((member, index) => (
                  <PreviewCard
                    key={index}
                    member={member}
                    index={index}
                    onEdit={(member, index) => {
                      setFormData(member);
                      setEditingIndex(index);
                      setModalOpen(true);
                    }}
                    onDelete={deleteTeamMember}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Modal */}
          <Modal
            className="bg-white rounded-lg shadow p-4"
            isOpen={isModalOpen}
            onClose={resetForm}
            size="3xl"
          >
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>
                  <h2 className="text-2xl font-medium text-gray2">
                    {editingIndex !== null
                      ? t("translation:teamMember.modal.editMember")
                      : t("translation:teamMember.modal.inviteMember")}
                  </h2>
                </ModalHeader>

                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                    <div className="space-y-4 mt-12">
                      <Input
                        className="border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                        placeholder={t("translation:teamMember.form.fields.name")}
                        value={formData.name}
                        onChange={(e) => setFormData({ name: e.target.value })}
                        dir="auto"
                        required
                      />

                      <Select
                        placeholder={t(
                          "translation:teamMember.form.fields.rolePlaceholder"
                        )}
                        selectedKeys={
                          formData.role ? new Set([formData.role]) : new Set()
                        }
                        onSelectionChange={handleRoleChange}
                        className="border border-light3 text-gray4 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                        isOpen={isSelectOpen}
                        onOpenChange={(open) => setSelectOpen(open)}
                      >
                        <SelectSection className="bg-white rounded-lg shadow text-light1 text-sm">
                          <SelectItem
                            key="Admin"
                            value="Admin"
                            textValue={t("translation:teamMember.roles.admin")}
                            className="hover:bg-primary50"
                          >
                            {t("translation:teamMember.roles.admin")}
                          </SelectItem>
                          <SelectItem
                            key="Teammate"
                            value="Teammate"
                            textValue={t("translation:teamMember.roles.teammate")}
                            className="hover:bg-primary50"
                          >
                            {t("translation:teamMember.roles.teammate")}
                          </SelectItem>
                        </SelectSection>
                      </Select>

                      <Input
                        type="email"
                        className="border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                        placeholder={t("translation:teamMember.form.fields.email")}
                        value={formData.email}
                        onChange={(e) => setFormData({ email: e.target.value })}
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
                            setFormData({ description: e.target.value });
                            setDescriptionError("");
                          }}
                          minRows={4}
                          required
                          errorMessage={descriptionError}
                          isInvalid={!!descriptionError}
                        />
                        <div className="text-xs text-light1">
                          {formData.description.length}/{MIN_DESCRIPTION_LENGTH}{" "}
                          {t("translation:teamMember.preview.charactersMinimum")}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        {t("translation:teamMember.preview.title")}
                      </h3>
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
                    {t("translation:teamMember.modal.cancel")}
                  </Button>
                  <Button
                    className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
                    color="secondary"
                    type="submit"
                  >
                    {editingIndex !== null
                      ? t("translation:teamMember.modal.update")
                      : t("translation:teamMember.modal.save")}
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>

          {/* Invite Confirmation Modal */}
          <Modal
            className="bg-white rounded-lg shadow"
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            size="sm"
          >
            <ModalContent>
            <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="space-y-4 mt-12">
              <Input
                className={inputClassName}
                placeholder={t("translation:teamMember.form.fields.name")}
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                dir={isRTL ? "rtl" : "ltr"}
                required
              />

              <Select
                placeholder={t("translation:teamMember.form.fields.rolePlaceholder")}
                selectedKeys={formData.role ? new Set([formData.role]) : new Set()}
                onSelectionChange={handleRoleChange}
                className={inputClassName}
                isOpen={isSelectOpen}
                onOpenChange={(open) => setSelectOpen(open)}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <SelectSection className="bg-white rounded-lg shadow text-light1 text-sm">
                  <SelectItem
                    key="Admin"
                    value="Admin"
                    textValue={t("translation:teamMember.roles.admin")}
                    className="hover:bg-primary50"
                  >
                    {t("translation:teamMember.roles.admin")}
                  </SelectItem>
                  <SelectItem
                    key="Teammate"
                    value="Teammate"
                    textValue={t("translation:teamMember.roles.teammate")}
                    className="hover:bg-primary50"
                  >
                    {t("translation:teamMember.roles.teammate")}
                  </SelectItem>
                </SelectSection>
              </Select>

              <Input
                type="email"
                className={inputClassName}
                placeholder={t("translation:teamMember.form.fields.email")}
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                errorMessage={emailError}
                isInvalid={!!emailError}
                dir={isRTL ? "rtl" : "ltr"}
                required
              />

              <div>
                <Textarea
                  placeholder={t("translation:teamMember.form.fields.description")}
                  className={textareaClassName}
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ description: e.target.value });
                    setDescriptionError("");
                  }}
                  minRows={4}
                  required
                  errorMessage={descriptionError}
                  isInvalid={!!descriptionError}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <div className="text-xs text-light1">
                  {formData.description.length}/{MIN_DESCRIPTION_LENGTH}{" "}
                  {t("translation:teamMember.preview.charactersMinimum")}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">
                {t("translation:teamMember.preview.title")}
              </h3>
              <PreviewCard member={formData} showEdit={false} />
            </div>
          </div>
        </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
    </AuthWrapper>
  );
}
