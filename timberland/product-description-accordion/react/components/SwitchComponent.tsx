/* eslint-disable @typescript-eslint/no-require-imports */
import React, { FunctionComponent } from "react";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["table", "iconTable", "titleTable", "subTitleTable"];
const images = require["context"]("../assets/Benefits", true);

interface ContentProps {
  content: string;
  isContentImage: boolean;
}

const renderElementTable = (arrayDeCadenas: any, image) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <table className={`${handles.table} ma0`} style={{ width: "100%" }}>
      <tr>
        <td style={{ width: "20%" }} rowSpan={2}>
          <img
            className={handles.iconTable}
            alt="Icon"
            src={image}
            height={30}
            width={52}
          />
        </td>
        <td>
          <p className={`${handles.titleTable} ma0`}>{arrayDeCadenas[0]}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p className={`${handles.subTitleTable} ma0`}>{arrayDeCadenas[1]}</p>
        </td>
      </tr>
    </table>
  );
};

const SwitchComponent: FunctionComponent<ContentProps> = ({
  content,
  isContentImage,
}) => {
  const handles = useCssHandles(CSS_HANDLES);

  // eslint-disable-next-line no-lone-blocks
  {
    /* Si  isContentImage  se realiza un split para relacionar la ventaja
   con la imagen que le corresponde */
  }

  if (isContentImage) {
    const arrayDeCadenas = content.split("-");

    switch (arrayDeCadenas[0]) {
      case "SISTEMA DE ENERGÍA AEROCORE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./aerocore.svg`))}
          </div>
        );
        break;

      case "TECNOLOGÍA ANTI FATIGUE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./AntiFatigue.svg`))}
          </div>
        );
        break;
      case "BETTER LEATHER":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./BetterLeather.svg`))}
          </div>
        );
        break;
      case "CALZADO WATERPROOF":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Waterproof.svg`))}
          </div>
        );
        break;
      case "CLS":
        return (
          <div>{renderElementTable(arrayDeCadenas, images(`./CLS.svg`))}</div>
        );
        break;
      case "FIBRA CORDURA ECOMADE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Cordura.svg`))}
          </div>
        );
        break;
      case "DEFENDER REPELLENT SYSTEMS":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Defender.svg`))}
          </div>
        );
        break;
      case "GREENSTRIDE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./GreenStride.svg`))}
          </div>
        );
        break;
      case "GRIPSTICK RUBBER":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Gripstick.svg`))}
          </div>
        );
        break;
      case "SUELA HOVERLITE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./HoverLite.svg`))}
          </div>
        );
        break;
      case "SUELA VIBRAM":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Vibram.svg`))}
          </div>
        );
        break;
      case "SUELA DE TRACCIÓN L7":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Traction.svg`))}
          </div>
        );
        break;
      case "MIRRORFIT SYSTEM":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./MirrorFit.svg`))}
          </div>
        );
        break;
      case "NeoVENT S":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./NeoVentS.svg`))}
          </div>
        );
        break;
      case "TELA NXTWool":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./NxWool.svg`))}
          </div>
        );
        break;
      case "ALGODÓN ORGÁNICO":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./OrganicContent.svg`))}
          </div>
        );
        break;
      case "PLANTILLAS ORTHOLITE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Ortholite.svg`))}
          </div>
        );
        break;
      case "PIEL LITE":
        return (
          <div>{renderElementTable(arrayDeCadenas, images(`./Lite.svg`))}</div>
        );
        break;
      case "TECNOLOGÍA OUTLAST":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Outlast.svg`))}
          </div>
        );
        break;
      case "EMPACABLE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Packable.svg`))}
          </div>
        );
        break;
      case "ECO AISLAMIENTO PRIMALOFT":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./PrimaLoft.svg`))}
          </div>
        );
        break;
      case "MATERIAL REBOTL":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Rebotl.svg`))}
          </div>
        );
        break;
      case "COMFORTEMP":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Confortemp.svg`))}
          </div>
        );
        break;
        case "Comfortemp":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Confortemp.svg`))}
          </div>
        );
        break;
      case "SISTEMA DE CONFORT SENSORFLEX":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./SensorFlex.svg`))}
          </div>
        );
        break;

      case "SISTEMA DE CAPAS COMPATIBLES":
        return (
          <div>{renderElementTable(arrayDeCadenas, images(`./DWR.svg`))}</div>
        );
        break;
      case "ROPA IMPERMEABLE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Waterproof.svg`))}
          </div>
        );
        break;
      case "TECNOLOGÍA IMPERMEABLE DRYVENT":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./DryVent.svg`))}
          </div>
        );
        break;
        case "Dryvent":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./DryVent.svg`))}
          </div>
        );
        break;
      case "MEMBRANA GORE TEX":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./GoreTEx.svg`))}
          </div>
        );
        break;
      case "TENCEL X REFRIBA":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Tencel.svg`))}
          </div>
        );
        break;
      case "THERMO FIBRE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./ThermoFibre.svg`))}
          </div>
        );
        break;
      case "AISLAMIENTO THERMORE":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Thermore.svg`))}
          </div>
        );
        break;
      case "AISLAMIENTO THERMORE ECODOWN":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./TermoreEcodown.svg`))}
          </div>
        );
        break;
      case "THREAD":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./Thread.svg`))}
          </div>
        );
        break;
      case "TECNOLOGÍA IMPERMEABLE TIMBERDRY":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./TimberDry.svg`))}
          </div>
        );
        break;
      case "TIMBERGRIP":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./TimberGrip.svg`))}
          </div>
        );
        break;
      case "Traction Lug":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./TractionLug.svg`))}
          </div>
        );
        break;
      case "ESPUMA DE CONFORT TRUECLOUD":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./TrueCloud.svg`))}
          </div>
        );
        break;
      case "RESISTENTE AL AGUA":
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./WaterResistant.svg`))}
          </div>
        );
        break;
      case "REPELENTE AL AGUA":
        return (
          <div>{renderElementTable(arrayDeCadenas, images(`./Tier2.svg`))}</div>
        );
        break;

      case "REPELENTE AL AGUA DURADERO ":
        return (
          <div>{renderElementTable(arrayDeCadenas, images(`./DWR.svg`))}</div>
        );
        break;

      case "REPELENTE AL AGUA DURADERO":
        return (
          <div>{renderElementTable(arrayDeCadenas, images(`./DWR.svg`))}</div>
        );
        break;
      case "Reversible":
        return (
          <div>
            {renderElementTable(
              arrayDeCadenas,
              require("../assets/Benefits/Reversible.svg")
            )}
          </div>
        );
        break;

      default:
        return (
          <div>
            {renderElementTable(arrayDeCadenas, images(`./default.svg`))}
          </div>
        );
        break;
    }
  }

  {
    // test
    /* si isContentImage es falso significa que no es una ventaja y solo se regresa un li
   con la caracteristica o descripcion del producto */
  }

  return <li className={`${handles.subTitleTable} mb3`}>{content}</li>;
};

export default SwitchComponent;
