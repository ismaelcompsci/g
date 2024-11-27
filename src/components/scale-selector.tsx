"use client";

import { Scale } from "@/types/scale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ScaleSelectorProps {
  title: string;
  options: number[];
  selected: Scale;
  onChange: (value: Scale) => void;
  customValue?: number;
  onCustomValueChange?: (value: number) => void;
}

export function ScaleSelector({
  title,
  options,
  selected,
  onChange,
  customValue,
  onCustomValueChange,
}: ScaleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>{title}</Label>
      <Card className="p-1 flex gap-1">
        {[...options, "custom" as const].map((option) => (
          <Button
            key={String(option)}
            variant={option === selected ? "default" : "ghost"}
            onClick={() => onChange(option)}
            className="flex-1"
            size="sm"
          >
            {option === "custom" ? "Custom" : `${option}×`}
          </Button>
        ))}
      </Card>

      {selected === "custom" && onCustomValueChange && (
        <Input
          type="number"
          min="0"
          max="64"
          step="1"
          value={customValue}
          onChange={(e) => {
            const value = Math.min(64, parseFloat(e.target.value));
            onCustomValueChange(value);
          }}
          onKeyDown={(e) => {
            if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

            e.preventDefault();
            const currentValue = customValue ?? 0;
            let step = 1;

            if (e.shiftKey) step = 10;
            if (e.altKey) step = 0.1;

            const newValue =
              e.key === "ArrowUp" ? currentValue + step : currentValue - step;

            const clampedValue = Math.min(
              64,
              Math.max(0, Number(newValue.toFixed(1)))
            );
            onCustomValueChange(clampedValue);
          }}
          placeholder="Enter scale"
        />
      )}
    </div>
  );
}
