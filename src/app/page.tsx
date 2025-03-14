import CaseList from "@/components/CaseList";
import Header from "@/components/Header";

export default function Home() {
    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <div className="flex justify-center w-full">
                <div className="flex py-5 flex-col gap-4 w-[760px] px-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-2xl">Did you buy any of these products?</h1>
                        <p className="text-sm">Select all claims you believe you qualify for</p>
                    </div>
                    <CaseList />
                </div>
            </div>
        </div>
    );
}
