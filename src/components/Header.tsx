"use client";

import useEarningsStore from "@/stores/earningsStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/helpers/cn";
import useTrackingStore from "@/stores/trackingStore";

const Header = () => {
    const earnings = useEarningsStore((state) => state.potentialClaimEarnings);
    const [previousEarnings, setPreviousEarnings] = useState(earnings);
    const [difference, setDifference] = useState(0);
    const [showDifference, setShowDifference] = useState(false);
    const itemClicks = useTrackingStore((state) => state.itemClicks);
    const moreClicks = useTrackingStore((state) => state.moreClicks);

    useEffect(() => {
        if (earnings !== previousEarnings) {
            setDifference(earnings - previousEarnings);
            setShowDifference(true);

            setTimeout(() => {
                setPreviousEarnings(earnings);
                setShowDifference(false);
            }, 1000);
        }
    }, [earnings, previousEarnings]);

    return (
        <div className="flex w-full h-16 items-center justify-between px-4 text-medium">
            <div className="flex max-md:flex-col md:items-center gap-2">
                <span>Case clicks: {itemClicks}</span>
                <span>More data clicks: {moreClicks}</span>
            </div>
            <div className="flex items-start gap-1">
                <span className="text-[10px]">Potential claim earnings</span>
                <AnimatePresence>
                    {showDifference ? (
                        <motion.span
                            key="difference"
                            initial={{
                                x: -20,
                                y: 20,
                                scale: 1.5,
                            }}
                            animate={{
                                x: 0,
                                y: 0,
                                scale: 1,
                            }}
                            className={cn(`text-xl`, difference > 0 ? "text-green-500" : "text-red-500")}
                        >
                            {difference > 0 ? `+${difference}` : difference}
                        </motion.span>
                    ) : (
                        <motion.span
                            key="earnings"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl"
                        >
                            ${earnings}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Header;
