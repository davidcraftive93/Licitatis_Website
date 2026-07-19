import type { SpotlightVisual } from "@/lib/content";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import { RequirementsMock } from "@/components/mockups/RequirementsMock";
import { TimelineMock } from "@/components/mockups/TimelineMock";
import { MetricsMock } from "@/components/mockups/MetricsMock";

/** Renderiza el mockup de producto que corresponde al spotlight (todo demostración). */
export function MockByName({ visual }: { visual: SpotlightVisual }) {
  if (visual === "dashboard") {
    return (
      <BrowserFrame aria-label="Vista de demostración del panel de LICITATIS">
        <DashboardMock />
      </BrowserFrame>
    );
  }
  if (visual === "requirements") return <RequirementsMock />;
  if (visual === "timeline") return <TimelineMock />;
  return <MetricsMock />;
}
