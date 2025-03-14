"use client";

import casesData from "@/data/cases.json";
import CaseItem from "./CaseItem";
import { CaseItemType } from "@/types/types";

const cases: CaseItemType[] = casesData as CaseItemType[];

const CaseList = () => {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 w-full auto-rows-auto gap-x-3 gap-y-4">
            {cases.map((item) => (
                <CaseItem key={item.id} {...item} />
            ))}
        </div>
    );
};

export default CaseList;
