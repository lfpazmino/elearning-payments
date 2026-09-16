import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Resources } from "@/components/Resources";
import { UnitFooter } from "@/components/UnitFooter";
import { FLAT, indexOfKey } from "@/lib/course";

export function generateStaticParams() {
  return FLAT.map((f) => ({ module: f.mod.id, unit: f.unit.id }));
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ module: string; unit: string }>;
}) {
  const { module: modId, unit: unitId } = await params;
  const i = indexOfKey(`${modId}/${unitId}`);
  if (i < 0) notFound();

  const f = FLAT[i];
  const { mod, unit } = f;

  return (
    <div className="pane">
      <div className="crumb">
        <span className="m">
          Module {mod.n} · {mod.title}
        </span>
        <span className="sep">—</span>
        <span className="t">
          Unit {f.ui + 1} of {mod.units.length} · {unit.mins} min
        </span>
      </div>

      <h1 className="unit-title">{unit.title}</h1>
      <p
        className="objective"
        dangerouslySetInnerHTML={{ __html: "<strong>Objective.</strong> " + unit.objective }}
      />

      <div className="body">
        <BlockRenderer blocks={unit.blocks} />
      </div>

      {unit.resources.length > 0 ? (
        <>
          <span className="sect-label">Free resources</span>
          <Resources list={unit.resources} />
        </>
      ) : null}

      {unit.check.length > 0 ? (
        <>
          <span className="sect-label">Prove it</span>
          <div className="prove">
            <span className="pt">Self-check before moving on</span>
            <ol>
              {unit.check.map((c, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: c }} />
              ))}
            </ol>
          </div>
        </>
      ) : null}

      <UnitFooter index={i} />
    </div>
  );
}
