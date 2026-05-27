import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Settings2,
  RefreshCw,
  Zap,
  Info,
} from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import { simulateProjections, getDefaultParams, BASELINE_2025 } from '../lib/landCoverSimulation';

export default function PredictivePage() {
  const [reforestationRate, setReforestationRate] = useState(getDefaultParams().reforestationRate);
  const [agriExpansion, setAgriExpansion] = useState(getDefaultParams().agriExpansion);
  const [sustainableAdoption, setSustainableAdoption] = useState(getDefaultParams().sustainableAdoption);

  const simulatedData = useMemo(
    () => simulateProjections({ reforestationRate, agriExpansion, sustainableAdoption }),
    [reforestationRate, agriExpansion, sustainableAdoption]
  );

  const result2035 = simulatedData[simulatedData.length - 1];
  const forestDelta = Math.round((result2035.forestryArea - BASELINE_2025.forestryArea) * 10) / 10;
  const agriDelta = Math.round((result2035.agricultureArea - BASELINE_2025.agricultureArea) * 10) / 10;
  const carbonDelta = Math.round(result2035.carbonEmissionIndex - 100);

  const handleReset = () => {
    const def = getDefaultParams();
    setReforestationRate(def.reforestationRate);
    setAgriExpansion(def.agriExpansion);
    setSustainableAdoption(def.sustainableAdoption);
  };

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div
          className="rounded-2xl p-6 border relative overflow-hidden bg-surface border-theme"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono w-fit border mb-2"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                }}
              >
                <Zap size={11} />
                <span>Simulador de Cenários</span>
              </div>
              <h2
                className="text-xl font-bold tracking-tight text-primary"
              >
                Simulador de Políticas de Uso do Solo
              </h2>
              <p className="text-sm mt-1 text-secondary">
                Ajuste os parâmetros abaixo e veja as projeções até <strong>2035</strong>
              </p>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all border w-fit"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              <RefreshCw size={14} />
              Resetar Padrão
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div
              className="rounded-2xl p-6 border space-y-6 bg-surface border-theme"
            >
              <h4
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted"
              >
                <Settings2 size={14} />
                Parâmetros de Política
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-primary">
                  <span className="font-semibold">Reflorestamento</span>
                  <span className="font-bold" style={{ color: 'var(--color-primary)' }}>+{reforestationRate}% / ano</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={reforestationRate}
                  onChange={(e) => setReforestationRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
                <p className="text-xs text-muted">
                  Taxa de recuperação de áreas degradadas e reflorestamento de reservas legais.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-primary">
                  <span className="font-semibold">Expansão Agrícola</span>
                  <span className="font-bold text-amber-500">+{agriExpansion}% / ano</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={agriExpansion}
                  onChange={(e) => setAgriExpansion(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
                <p className="text-xs text-muted">
                  Conversão de pastagens degradadas para agricultura intensiva.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-primary">
                  <span className="font-semibold">Adoção Sustentável</span>
                  <span className="font-bold text-emerald-500">{sustainableAdoption}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={sustainableAdoption}
                  onChange={(e) => setSustainableAdoption(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
                <p className="text-xs text-muted">
                  Integração lavoura-pecuária-floresta (ILPF), plantio direto e bioinsumos.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-5 border space-y-3"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                borderColor: 'var(--color-primary)',
                opacity: 0.9,
              }}
            >
              <h5
                className="text-xs font-bold flex items-center gap-1"
                style={{ color: 'var(--color-primary)' }}
              >
                <Info size={14} />
                Sobre o Modelo
              </h5>
              <p className="text-xs leading-relaxed text-secondary">
                O simulador projeta cenários baseados em parâmetros do <strong>Plano ABC+</strong> e dados do
                MapBiomas. Pastagens atuam como amortecedor: recuperando pastagens degradadas,
                o Brasil pode expandir agricultura e floresta simultaneamente.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div
              className="rounded-2xl p-6 border bg-surface border-theme"
            >
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-1 text-muted"
              >
                Projeção Anual (2025 - 2035)
              </h3>
              <p className="text-sm mb-4 text-secondary">
                Interação entre reflorestamento, expansão agrícola e emissões
              </p>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simulatedData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                      tickLine={false}
                    />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                      labelStyle={{ color: 'var(--color-text-primary)', fontWeight: 'bold' }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    />
                    <Line
                      type="monotone"
                      name="Floresta (Mha)"
                      dataKey="forestryArea"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      name="Pastagem (Mha)"
                      dataKey="pastureArea"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="4 4"
                    />
                    <Line
                      type="monotone"
                      name="Agricultura (Mha)"
                      dataKey="agricultureArea"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      name="Índice de Emissão"
                      dataKey="carbonEmissionIndex"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="grid grid-cols-3 gap-4"
            >
              <div
                className="rounded-2xl p-5 border text-center bg-surface border-theme"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-muted">
                  Variação Florestal
                </p>
                <h3
                  className="text-2xl font-black"
                  style={{ color: forestDelta >= 0 ? '#10b981' : '#ef4444' }}
                >
                  {forestDelta >= 0 ? '+' : ''}{forestDelta} Mha
                </h3>
                <p className="text-xs mt-1 text-muted">
                  {forestDelta >= 0 ? 'Ganho de cobertura' : 'Perda florestal'}
                </p>
              </div>

              <div
                className="rounded-2xl p-5 border text-center bg-surface border-theme"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-muted">
                  Expansão Agrícola
                </p>
                <h3 className="text-2xl font-black text-amber-500">
                  +{agriDelta} Mha
                </h3>
                <p className="text-xs mt-1 text-muted">
                  Nova área cultivada
                </p>
              </div>

              <div
                className="rounded-2xl p-5 border text-center bg-surface border-theme"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-muted">
                  Status de Emissão
                </p>
                <h3
                  className="text-2xl font-black"
                  style={{ color: carbonDelta <= 0 ? '#10b981' : '#ef4444' }}
                >
                  {carbonDelta <= 0 ? '' : '+'}{carbonDelta}%
                </h3>
                <p className="text-xs mt-1 text-muted">
                  {carbonDelta <= 0 ? 'Redução de emissões' : 'Aumento de emissões'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
