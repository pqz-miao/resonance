import Link from "next/link";
import { Headphones, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

interface Props {
    title: string;
    className?: string;
};

export const PageHeader = ({ title, className }: Props) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between border-b px-4 py-4",
                className,
            )}
        >
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:business@codewithantonio.com">
                        <ThumbsUp />
                        <span className="hidden lg:block">Feedback</span>
                    </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:business@codewithantonio.com">
                        <Headphones />
                        <span className="hidden lg:block">Need help?</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
};
