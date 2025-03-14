import { CloseIcon } from "@/lib/assets/icons";
import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    description: string;
}

const DescriptionModal: FC<Props> = ({ isOpen, onClose, description }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                    exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white rounded w-[500px] flex flex-col p-4 gap-4 shadow-lg"
                    >
                        <div className="flex items-center justify-center relative">
                            <button className="absolute left-0 top-0 hover:cursor-pointer" onClick={onClose}>
                                <CloseIcon className="size-3.5" />
                            </button>
                            <h1 className="text-base">Criteria</h1>
                        </div>
                        <p className="text-sm">{description}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DescriptionModal;
