"use client";

import { Button } from "@/components/ui/button";
import { VariableSizeGrid as Grid } from "react-window";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AutoSizer from "react-virtualized-auto-sizer";
import { icons, Search } from "lucide-react";
import { Input } from "./ui/input";
import { createElement, useMemo, useRef, useState } from "react";

type IconName = keyof typeof icons;

interface IconPickerProps {
  onSelect?: (icon: IconName) => void;
}

export function IconPicker({ onSelect }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const gridRef = useRef<Grid | null>(null);

  const filteredIcons = useMemo(() => {
    return Object.entries(icons).filter(([name]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectIcon = (iconName: IconName) => {
    setSelectedIcon(iconName);
    onSelect?.(iconName);
    setOpen(false);
  };

  const ICON_SIZE = 40;
  const SCROLLBAR_WIDTH = 8;

  const getColumnWidth = () => ICON_SIZE;
  const getRowHeight = () => ICON_SIZE;

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
              {createElement(icons[selectedIcon])}
              <span className="ml-2">{selectedIcon}</span>
            </>
          ) : (
            "Select icon..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[312px]">
        <div className="space-y-2">
          <div className="relative flex flex-row items-center">
            <Search className="absolute w-3 h-3 ml-2 text-muted-foreground" />
            <Input
              className="h-7 pl-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="h-[200px] w-[312px]">
            <AutoSizer>
              {({ height, width }) => {
                const columnCount = Math.floor(width / ICON_SIZE);
                const rowCount = Math.ceil(filteredIcons.length / columnCount);
                const gridWidth = width - SCROLLBAR_WIDTH;

                return (
                  <Grid
                    className="no-scrollbars"
                    ref={gridRef}
                    height={height}
                    width={gridWidth}
                    columnWidth={getColumnWidth}
                    rowHeight={getRowHeight}
                    columnCount={columnCount}
                    rowCount={rowCount}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const index = rowIndex * columnCount + columnIndex;
                      const lucideIcon = filteredIcons[index];

                      if (!lucideIcon) return null;

                      const [iconName, Icon] = lucideIcon;

                      return (
                        <button
                          key={`${iconName}-${index}`}
                          style={style}
                          className="rounded-md hover:bg-muted flex flex-col justify-center items-center w-full h-full"
                          onClick={() => handleSelectIcon(iconName as IconName)}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      );
                    }}
                  </Grid>
                );
              }}
            </AutoSizer>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
