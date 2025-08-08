import React, { Fragment } from "react";
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Separator } from "@radix-ui/react-select";

function ProductFilter() {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold flex items-start">{keyItem}</h3>
              <div className="grid gap-3 mt-5 ">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input type="checkbox" className="form-checkbox" />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator/>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
