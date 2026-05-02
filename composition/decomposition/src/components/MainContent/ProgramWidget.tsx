export const ProgramWidget = () => (
    <div className="program-widget">
        <div className="program-heading">
            <h4>Телепрограмма</h4>
            <button className="program-button">
                <span className="program-button_arrow"></span>
                <h5 className="program-button_text">Эфир</h5>
            </button>
        </div>
        <div className="program-column">
            <p><b>02:00 ТНТ. Best </b><span>ТНТ International</span></p>
            <p><b>02:15 Джинглики </b><span>Карусель INT</span></p>
            <p><b>02:25 Наедине со всеми </b><span>Первый</span></p>
        </div>
    </div>
);
