import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "@nextui-org/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";

import { BrandCard } from "./BrandCard";
import { Brand } from "../types/brand";

interface BrandDisplayProps {
  filteredBrands: Brand[];
  paginatedResults: Brand[];
  currentPage: number;
  brandsPerPage: number;
  onPageChange: (page: number) => void;
  hasActiveFilters: boolean; // New prop to check if any filters are active
}

export const BrandDisplay: React.FC<BrandDisplayProps> = ({
  filteredBrands,
  paginatedResults,
  currentPage,
  brandsPerPage,
  onPageChange,
  hasActiveFilters,
}) => {
  // Pagination render item function for desktop
  const renderPaginationItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: any) => {
    if (value === "next") {
      return (
        <button
          key={key}
          className={`${className} bg-default-200/50 min-w-8 w-8 h-8`}
          onClick={onNext}
        >
          <MdKeyboardArrowRight className="w-6 h-6" />
        </button>
      );
    }

    if (value === "prev") {
      return (
        <button
          key={key}
          className={`${className} bg-default-200/50 min-w-8 w-8 h-8`}
          onClick={onPrevious}
        >
          <MdKeyboardArrowLeft className="w-6 h-6" />
        </button>
      );
    }

    if (value === "dots") {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={`${className} ${
          isActive
            ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
            : ""
        }`}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  if (filteredBrands.length === 0 && hasActiveFilters) {
    return (
      <div className="bg-gray-100 border rounded-lg p-6 my-8 text-center">
        <p className="text-gray-600 text-lg">
          No brands found matching your search or filters.
        </p>
      </div>
    );
  }

  if (filteredBrands.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Brands</h2>

      <p className="mb-4 text-gray-600">
        {`Found ${filteredBrands.length} brand${
          filteredBrands.length !== 1 ? "s" : ""
        }`}
      </p>

      {/* Desktop Grid View (md and up) */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
        {paginatedResults.map((brand, index) => (
          <BrandCard key={index} brand={brand} />
        ))}
      </div>

      {/* Mobile Slider View (below md) */}
      <div className="block md:hidden mb-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2,
            },
          }}
        >
          {filteredBrands.map((brand, index) => (
            <SwiperSlide key={index}>
              <BrandCard brand={brand} />
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev absolute top-1/2 left-0 z-10 cursor-pointer">
            <MdKeyboardArrowLeft className="w-8 h-8 text-gray-700" />
          </div>
          <div className="swiper-button-next absolute top-1/2 right-0 z-10 cursor-pointer">
            <MdKeyboardArrowRight className="w-8 h-8 text-gray-700" />
          </div>
        </Swiper>
      </div>

      {/* Desktop Pagination (md and up) */}
      <div className="hidden md:flex justify-center">
        <Pagination
          disableCursorAnimation
          showControls
          className="gap-2"
          page={currentPage}
          total={Math.ceil(filteredBrands.length / brandsPerPage)}
          initialPage={1}
          radius="full"
          renderItem={renderPaginationItem}
          variant="light"
          onChange={onPageChange}
        />
      </div>

      {/* Mobile Pagination (below md) */}
      <div className="block md:hidden text-center mt-4">
        <div className="inline-flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <MdKeyboardArrowLeft className="w-8 h-8" />
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredBrands.length / brandsPerPage)}
          </span>
          <button
            onClick={() =>
              onPageChange(
                Math.min(
                  Math.ceil(filteredBrands.length / brandsPerPage),
                  currentPage + 1
                )
              )
            }
            disabled={
              currentPage === Math.ceil(filteredBrands.length / brandsPerPage)
            }
            className="disabled:opacity-50"
          >
            <MdKeyboardArrowRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};
