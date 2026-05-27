import ModuleHeader from '../layouts/ModuleHeader';
import Card from '../components/ui/Card';

export default function AboutPage() {
  return (
    <div>
      <ModuleHeader
        moduleName="About"
        title="ℹ️ About the LANDAGRI-B Dashboard"
        subtitle="Learn about the LANDAGRI-B Dashboard objectives and how to navigate through its specialized modules."
      />

      <Card className="mb-6">
        <p className="text-slate-700 leading-relaxed">
          <strong>LANDAGRI-B Dashboard</strong> is an integrated platform for exploring and comparing Land Use and Land Cover (LULC) mapping initiatives,
          as well as agricultural information from Brazil. It was designed with the objective of assisting students, researchers, public managers and decision makers who need
          to access detailed information about LULC and Agriculture mapping products in Brazil in a centralized way. The Dashboard offers a user-friendly interface and advanced data visualization
          features across three main modules: <em>Overview</em>, <em>Initiative Analysis</em> and <em>Agricultural Analysis</em>; plus the <em>About</em> module. Each module is designed to provide specific insights and tools, as shown below:
        </p>
      </Card>

      {/* Module cards - 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(168, 218, 220, 0.5)', border: '1px solid #4CAF50' }}>
          <h3 className="text-lg font-bold mb-1" style={{ color: '#2E7D32' }}>🔎 Overview</h3>
          <p className="text-sm text-slate-700">
            Consolidated overview of LULC initiatives with key metrics, classifications and sensor information.
          </p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#D2B48C', border: '1px solid #A0522D' }}>
          <h3 className="text-lg font-bold mb-1" style={{ color: '#8B4513' }}>🏞 Initiative Analysis</h3>
          <p className="text-sm text-slate-700">
            Temporal, comparative and detailed analysis of the thirteen LULC initiatives, with interactive charts and tables.
          </p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 165, 0, 0.5)', border: '1px solid #FF8C00' }}>
          <h3 className="text-lg font-bold mb-1" style={{ color: '#8B4513' }}>🌾 Agricultural Analysis</h3>
          <p className="text-sm text-slate-700">
            Agricultural indicators, crop calendar and aggregated availability by region and time period.
          </p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(234, 134, 120, 0.5)', border: '1px solid #fed7aa' }}>
          <h3 className="text-lg font-bold mb-1" style={{ color: '#EF5C67' }}>ℹ️ About</h3>
          <p className="text-sm text-slate-700">
            Institutional information, data sources, and navigation guide.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Navigation Guide */}
      <Card className="mb-6" padding="md" hover={false}>
        <h3 className="text-lg font-bold mb-3" style={{ color: '#EF5C67' }}>🧭 How to Navigate</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>Use the sidebar menu to choose the module and page.</li>
          <li>Filters and tabs appear within each module, according to context.</li>
          <li>Selected parameters are maintained during navigation.</li>
        </ul>
      </Card>

      <hr className="border-slate-200 my-6" />

      {/* Data Sources */}
      <Card className="mb-6" padding="md" hover={false}>
        <h3 className="text-lg font-bold mb-3 text-slate-800">🌐 Data Sources and References</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>
            LULC mapping initiatives:{' '}
            <a href="https://doi.org/10.3390/rs17132324" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Santos et al. (2025)
            </a>
          </li>
          <li>
            Agricultural data from{' '}
            <a href="https://www.conab.gov.br/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CONAB</a>
            {' '}and{' '}
            <a href="https://www.ibge.gov.br/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IBGE</a>
          </li>
        </ul>
      </Card>

      <hr className="border-slate-200 my-6" />

      {/* Citation */}
      <Card className="mb-6" padding="md" hover={false}>
        <h3 className="text-lg font-bold mb-3 text-slate-800">©️ Citation</h3>
        <p className="text-sm text-slate-700 mb-3">
          This work is part of the LANDAGRI project, built under the MIT License.
        </p>
        <p className="text-sm text-slate-700 mb-3">
          Use and reproduction of the dashboard results are authorized, as long as proper credit is given.
        </p>
        <p className="text-sm text-slate-700 mb-3">
          If you use this dashboard in academic or technical work, please cite the products and the LANDAGRI-B project using the following references:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>
            Initiatives and products information main article:{' '}
            <a href="https://doi.org/10.3390/rs17132324" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Santos et al. (2025)
            </a>
          </li>
          <li>
            Project's main article:{' '}
            <a href="http://mtc-m16c.sid.inpe.br/ibi/sid.inpe.br/mtc-m18/2010/10.19.13.42" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Santos and Adami (2025)
            </a>
          </li>
          <li>
            LANDAGRI-B repository in Zenodo:{' '}
            <a href="https://doi.org/10.5281/zenodo.17042299" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Santos, Silva, and Adami (2025)
            </a>
          </li>
        </ul>
      </Card>

      <hr className="border-slate-200 my-6" />

      {/* Contact */}
      <Card className="mb-6" padding="md" hover={false}>
        <h3 className="text-lg font-bold mb-3 text-slate-800">ᯓ➤ Contact</h3>
        <p className="text-sm text-slate-700 mb-2">
          Questions or suggestions can be directed to the project team.
        </p>
        <p className="text-sm text-slate-700 mb-1">
          📧 E-mail: <a href="mailto:priscilla.santos@inpe.br" className="text-blue-600 hover:underline">priscilla.santos@inpe.br</a> (head)
        </p>
        <p className="text-sm text-slate-700">
          🔗 GitHub:{' '}
          <a href="https://github.com/landagri-b" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            https://github.com/landagri-b
          </a>
        </p>
      </Card>

      <hr className="border-slate-200 my-6" />

      {/* Partner Logos */}
      <h3 className="text-lg font-bold mb-4 text-slate-800 text-center">Institutional Partners</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center">
        <div className="p-4">
          <img
            src="/LANDAGRI-B_Dashboard/logos/INPE.png"
            alt="INPE Logo"
            className="max-w-[200px] h-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="p-4">
          <img
            src="/LANDAGRI-B_Dashboard/logos/AGRIRSLAB.png"
            alt="AGRIRSLAB Logo"
            className="max-w-[200px] h-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="p-4">
          <img
            src="/LANDAGRI-B_Dashboard/logos/LANDAGRIB.png"
            alt="LANDAGRIB Logo"
            className="max-w-[200px] h-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>

      {/* If logos fail to load, show placeholder text */}
      <div className="text-center text-xs text-slate-400 mt-2">
        Partner institutions: INPE • AGRIRSLAB • LANDAGRIB
      </div>
    </div>
  );
}
