import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import { Button } from "../button";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "DevOps Engineer",
  "AI Engineer",
  "Game Developer",
  "Technical Writer"
];

const Categories = () => {
  return (
    <div className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Explore Categories
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Browse specialized roles that match your unique skills and career ambitions.
        </p>

        <div className="relative max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {Category.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 flex items-center justify-center p-2"
                >
                  <Button
                    className="w-full h-14 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50/50 shadow-sm hover:shadow-md transition-all duration-300 text-base font-medium"
                    variant="ghost"
                  >
                    {category}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 border-gray-200 hover:border-green-500 hover:text-green-600 w-10 h-10" />
              <CarouselNext className="-right-12 border-gray-200 hover:border-green-500 hover:text-green-600 w-10 h-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Categories;
