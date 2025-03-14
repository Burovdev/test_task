"use client";
import { timeLeftToDate } from "@/helpers/date";
import { NoProofIcon, ProofNeededIcon } from "@/lib/assets/icons";
import { FC, useState, useRef, useEffect } from "react";
import Checkbox from "./Checkbox";
import useEarningsStore from "@/stores/earningsStore";
import { CaseItemType } from "@/types/types";
import DescriptionModal from "./DescriptionModal";
import useTrackingStore from "@/stores/trackingStore";
import useCaseStore from "@/stores/caseStore";

const CaseItem: FC<CaseItemType> = ({ id, name, close_date, description, proof_needed, cost }) => {
    const { checkedItems, toggleChecked } = useCaseStore();
    const decreasePotentialClaimEarnings = useEarningsStore((state) => state.decreasePotentialClaimEarnings);
    const addPotentialClaimEarnings = useEarningsStore((state) => state.addPotentialClaimEarnings);

    const checked = checkedItems[id] || false;

    const addItemClick = useTrackingStore((state) => state.addItemClicks);
    const addMoreClick = useTrackingStore((state) => state.addMoreClicks);

    const descriptionRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [truncatedText, setTruncatedText] = useState(description);
    const [isTruncated, setIsTruncated] = useState(false);

    const handleClickItem = () => {
        console.log(name);
        toggleChecked(id);
        if (!checked) {
            addPotentialClaimEarnings(cost);
        } else {
            decreasePotentialClaimEarnings(cost);
        }
        addItemClick();
    };

    const handleClickMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsModalOpen(true);
        addMoreClick();
    };

    useEffect(() => {
        if (descriptionRef.current) {
            const maxWords = 15;
            if (description.split(" ").length > maxWords) {
                setIsTruncated(true);
                const truncated = description.split(" ").slice(0, maxWords).join(" ") + "...";
                setTruncatedText(truncated);
            }
        }
    }, [description]);

    return (
        <>
            <div
                onClick={handleClickItem}
                className="flex flex-col justify-between p-5 gap-3 bg-gray-100 rounded-lg shadow-md w-full"
            >
                <div className="flex items-start gap-3">
                    <Checkbox checked={checked} />

                    <div className="flex flex-col gap-1 w-full">
                        <h2 className="text-lg font-semibold">{name}</h2>
                        <div ref={descriptionRef} className="text-sm">
                            {isTruncated ? (
                                <>
                                    {truncatedText}{" "}
                                    <button
                                        className="inline cursor-pointer font-medium underline hover:no-underline"
                                        onClick={handleClickMore}
                                    >
                                        More
                                    </button>
                                </>
                            ) : (
                                description
                            )}
                        </div>

                        <div className="flex items-center gap-1 text-gray-700 text-sm mt-1">
                            {proof_needed ? (
                                <ProofNeededIcon data-testid="proof-needed-icon" className="size-4" />
                            ) : (
                                <NoProofIcon data-testid="no-proof-icon" className="size-4" />
                            )}
                            <span>{proof_needed ? "Proof needed" : "No proof needed"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                    <div className="bg-gray-300 text-black px-4 py-2 rounded-full text-sm font-semibold">
                        {timeLeftToDate(close_date)}
                    </div>
                    <div className="flex items-start gap-1">
                        <span className="text-[10px] font-medium">Up to</span>
                        <span className="text-xl font-bold">${cost}</span>
                    </div>
                </div>
            </div>

            <DescriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} description={description} />
        </>
    );
};

export default CaseItem;
