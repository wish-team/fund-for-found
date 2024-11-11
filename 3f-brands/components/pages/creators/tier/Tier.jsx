import React, { useState, useEffect } from "react";
import {Modal, ModalContent,ModalHeader, ModalBody,ModalFooter,Button,Input,Textarea} from "@nextui-org/react";
import { Edit, Upload, Trash2 } from "lucide-react";
import { useForm, Controller, useWatch } from "react-hook-form";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";

const DEFAULT_IMAGE = "/api/placeholder/400/320";

const TierManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    index: null,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      rewardDescription: "",
      amount: "",
      coverPhoto: null,
    },
  });

  const handleNumericInput = (e, onChange) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      onChange(value);
    }
  };

  const formValues = useWatch({
    control,
    defaultValue: {
      name: "",
      rewardDescription: "",
      amount: "",
    }
  });

  useEffect(() => {
    const savedTiers = localStorage.getItem("tiers");
    if (savedTiers) {
      setTiers(JSON.parse(savedTiers));
    }
  }, []);

  const handleInputChange = (e, field) => {
    const { files } = e.target;
    if (files?.length > 0) {
      field.onChange(files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
      // Reset the input value to allow uploading the same image again
      e.target.value = '';
    }
  };

  const resetForm = () => {
    reset({
      name: "",
      rewardDescription: "",
      amount: "",
      coverPhoto: null,
    });
    setImagePreview(null);
    setEditingIndex(null);
  };

  const handleAddNew = () => {
    setEditingIndex(null);
    resetForm();
    setIsOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const tier = tiers[index];
    reset({
      name: tier.name,
      rewardDescription: tier.rewardDescription,
      amount: tier.amount,
      coverPhoto: null,
    });
    setImagePreview(tier.imagePreview);
    setIsOpen(true);
  };

  const handleDelete = (index) => {
    setDeleteConfirmation({ show: true, index });
  };

  const confirmDelete = () => {
    const newTiers = tiers.filter((_, i) => i !== deleteConfirmation.index);
    setTiers(newTiers);
    localStorage.setItem("tiers", JSON.stringify(newTiers));
    setDeleteConfirmation({ show: false, index: null });
  };

  const onSubmit = (data) => {
    try {
      const newTiers = [...tiers];
      const submissionData = {
        name: data.name,
        rewardDescription: data.rewardDescription,
        amount: data.amount,
        imagePreview: imagePreview || DEFAULT_IMAGE,
      };

      if (editingIndex !== null) {
        newTiers[editingIndex] = submissionData;
      } else {
        newTiers.push(submissionData);
      }

      setTiers(newTiers);
      localStorage.setItem("tiers", JSON.stringify(newTiers));
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving tier:", error);
    }
  };

  const PreviewCard = ({ data, preview, onEdit, onDelete, index }) => (
    <div className="border rounded-lg shadow-sm w-full relative">
      <div className="bg-purple-600 text-white p-2 text-center relative">
        {data.name || "Enter Name"}
        {!preview && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              isIconOnly
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(index);
              }}
            >
              <Edit size={16} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">You are on the list</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <img
            src={preview ? imagePreview || DEFAULT_IMAGE : data.imagePreview || DEFAULT_IMAGE}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="text-gray-500 text-center">
          Start at{" "}
          <span className="text-purple-600 font-semibold">
            {data.amount || "0"}$
          </span>
        </div>
        <p className="text-gray-600 text-sm text-center">
          {data.rewardDescription || "Enter reward description"}
        </p>
        {preview && <Button color="primary" className="w-full mt-4">Contribute</Button>}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="max-w-[1048px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 md:flex-none">
            <div
              className="h-full border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-6"
              onClick={handleAddNew}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-4xl">+</span>
                </div>
                <h3 className="text-xl font-semibold text-purple-600">Add Tier</h3>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6">
              {tiers.map((tier, index) => (
                <div key={index} className="w-full md:w-80 md:flex-none">
                  <PreviewCard
                    data={tier}
                    preview={false}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, index: null })}
        onConfirm={confirmDelete}
        title="Delete Tier"
        message="This tier will be deleted. Are you sure you want to proceed?"
      />

      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onClose={() => {
          setIsOpen(false);
          resetForm();
        }}
        size="3xl"
        className="bg-white"
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="text-xl font-semibold bg-white">
              <h2 className="text-purple-600">
                {editingIndex !== null ? "Edit Tier" : "Add New Tier"}
              </h2>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter tier name"
                          variant="bordered"
                          className="w-full"
                          isInvalid={!!errors.name}
                          errorMessage={errors.name?.message}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reward Description
                    </label>
                    <Controller
                      name="rewardDescription"
                      control={control}
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Enter reward description"
                          variant="bordered"
                          className="w-full min-h-[100px]"
                          isInvalid={!!errors.rewardDescription}
                          errorMessage={errors.rewardDescription?.message}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <Controller
                      name="amount"
                      control={control}
                      rules={{
                        required: "Amount is required",
                        validate: (value) =>
                          parseInt(value) >= 0 || "Amount must be positive",
                      }}
                      render={({ field: { onChange, value, ...field } }) => (
                        <Input
                          {...field}
                          value={value}
                          type="text"
                          inputMode="numeric"
                          placeholder="Enter amount"
                          variant="bordered"
                          className="w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          isInvalid={!!errors.amount}
                          errorMessage={errors.amount?.message}
                          onInput={(e) => handleNumericInput(e, onChange)}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Photo
                    </label>
                    <Controller
                      name="coverPhoto"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <div
                            className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                            onClick={() =>
                              document.getElementById("coverPhotoInput").click()
                            }
                          >
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              Click to upload cover photo
                            </p>
                          </div>
                          <input
                            id="coverPhotoInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleInputChange(e, field)}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-4">
                    Preview
                  </h3>
                  <PreviewCard data={formValues} preview={true} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex gap-2">
                <Button
                  variant="light"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TierManagement;