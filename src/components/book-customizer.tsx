"use client";

import { useState } from "react";
import { Book } from "@/components/book";
import { ScaleSelector } from "@/components/scale-selector";
import { Scale } from "@/types/scale";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useBookToPng } from "@/hooks/use-book-to-png";

export function BookCustomizer() {
  const [title, setTitle] = useState(
    "The user experience of the Frontend Cloud"
  );

  const [width] = useState(196);
  const height = (width * 60) / 49;

  const [color, setColor] = useState("#3f3f3f");
  const [textColor, setTextColor] = useState("white");
  const [textured, setTextured] = useState(false);
  const [variant, setVariant] = useState<"simple" | "stripe">("stripe");

  // Scale controls
  const [scale, setScale] = useLocalStorage<Scale>("bookTool_scale", 1);
  const [customScale, setCustomScale] = useLocalStorage<number>(
    "bookTool_customScale",
    1
  );
  const effectiveScale = scale === "custom" ? customScale : scale;

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex gap-8">
        {/* Controls Panel */}
        <Card className="p-6 w-80">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>

              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color value"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="Enter text color value"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="textured"
                checked={textured}
                onCheckedChange={(checked) => setTextured(checked as boolean)}
              />
              <Label htmlFor="textured">Textured</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="variant">Variant</Label>
              <Select
                value={variant}
                onValueChange={(value: "simple" | "stripe") =>
                  setVariant(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <IconPicker />
            </div> */}
            <div>
              <ScaleSelector
                title="Export Scale"
                options={[1, 2, 4, 6]}
                selected={scale}
                onChange={setScale}
                customValue={customScale}
                onCustomValueChange={setCustomScale}
              />

              <span className="float-right text-xs pt-2 text-muted-foreground">
                {width * effectiveScale} x {height * effectiveScale}
              </span>
            </div>

            <ConvertToPngButton
              title={title}
              scale={customScale}
              height={height}
              width={width}
              container={containerRef}
            />
          </div>
        </Card>

        {/* Preview Panel */}
        <Card className="p-8 bg-background space-y-8">
          <div ref={setContainerRef}>
            <Book
              title={title}
              width={width}
              color={color}
              textColor={textColor}
              textured={textured}
              variant={variant}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export const ConvertToPngButton = (props: {
  container: HTMLDivElement | null;
  width: number;
  height: number;
  scale: number;
  title: string;
}) => {
  const { convertToPng, loading, error } = useBookToPng(props);
  return (
    <Button onClick={convertToPng} className="w-full transition-all">
      {loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : error ? (
        <div className="text-sm text-destructive-foreground">{error}</div>
      ) : (
        "Save as PNG"
      )}
    </Button>
  );
};
