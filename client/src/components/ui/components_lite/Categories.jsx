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
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
];

const Categories = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center text-red-950">
          Categories
        </h1>
        <p className="text-center text-gray-600">
          Browse roles that match your skills and ambitions.
        </p>
      </div>

      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {Category.map((category, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Button className="bg-green-800 text-white hover:bg-amber-800">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
