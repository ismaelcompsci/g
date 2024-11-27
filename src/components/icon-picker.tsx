"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { icons, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type IconName = keyof typeof icons;

interface IconPickerProps {
  onSelect?: (icon: IconName) => void;
}

export function IconPicker({ onSelect }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState<IconName | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredIcons = React.useMemo(() => {
    return Object.entries(icons).filter(([name]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectIcon = (iconName: IconName) => {
    setSelectedIcon(iconName);
    onSelect?.(iconName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedIcon ? (
            <>
              {React.createElement(icons[selectedIcon])}
              <span className="ml-2">{selectedIcon}</span>
            </>
          ) : (
            "Select icon..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2">
        <div className="relative flex flex-row items-center">
          <Search className="absolute w-3 h-3 ml-2 text-muted-foreground" />
          <Input
            className="h-7 pl-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px] flex flex-row items-center justify-center">
          <div className="flex flex-wrap p-2">
            {filteredIcons.map((icon) => {
              const name = icon[0] as IconName;
              const Icon = icon[1];
              return (
                <div
                  key={name}
                  onSelect={() => handleSelectIcon(name)}
                  className="cursor-pointer flex items-center justify-center rounded-md hover:bg-accent w-6 h-6"
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      selectedIcon === name && "text-primary"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
