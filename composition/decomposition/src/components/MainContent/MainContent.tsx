import { WeatherWidget } from './WeatherWidget';
import { VisitedWidget } from './VisitedWidget';
import { MapWidget } from './MapWidget';
import { ProgramWidget } from './ProgramWidget';
import { EtherWidget } from './EtherWidget';

export const MainContent = () => (
    <main className="main-content">
        <div className="column-1">
            <WeatherWidget />
            <VisitedWidget />
        </div>
        <div className="column-2">
            <MapWidget />
            <ProgramWidget />
        </div>
        <div className="column-3">
            <EtherWidget />
        </div>
    </main>
);