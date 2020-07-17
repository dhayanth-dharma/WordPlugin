import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  whiteColor
} from "../../resources/assets/material-dashboard-react.jsx";

const cardHeaderStyle = {
  cardHeader: {
    padding: "0.75rem 1.25rem",
    marginBottom: "0",
    borderBottom: "none",
    background: "transparent",
    zIndex: "3 !important",
    "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      margin: "0 15px",
      padding: "0",
      position: "relative",
      color: whiteColor
    },
    "&:first-child": {
      borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
    },
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      "&:not($cardHeaderIcon)": {
        borderRadius: "3px",
        marginTop: "-10px",
        padding: "1px"
      }
    },
    "&$cardHeaderStats svg": {
      fontSize: "18px",
      lineHeight: "48px",
      textAlign: "center",
      width: "24px",
      height: "24px",
      margin: "2px 2px 4px"
    },
    "&$cardHeaderStats i,&$cardHeaderStats .material-icons": {
      fontSize: "18px",
      lineHeight: "48px",
      width: "48px",
      height: "48px",
      textAlign: "center",
      overflow: "unset",
      marginBottom: "1px"
    },
    "&$cardHeaderStats$cardHeaderIcon": {
      textAlign: "right"
    }
  },
  cardHeaderPlain: {
    marginLeft: "0px !important",
    marginRight: "0px !important"
  },
  cardHeaderStats: {
    "& $cardHeaderIcon": {
      textAlign: "right"
    },
    "& h1,& h2,& h3,& h4,& h5,& h6": {
      margin: "0 !important"
    }
  },
  cardHeaderIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      background: "transparent",
      boxShadow: "none"
    },
    "& i,& .material-icons": {
      width: "20px",
      height: "20px",
      textAlign: "center",
      lineHeight: "20px"
    },
    "& svg": {
      width: "18px",
      height: "18px",
      textAlign: "center",
      lineHeight: "33px",
      margin: "5px 4px 0px"
    }
  },
  warningCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderIcon)": {
      ...warningCardHeader
    }
  },
  successCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderIcon)": {
      ...successCardHeader
    }
  },
  dangerCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderIcon)": {
      ...dangerCardHeader
    }
  },
  infoCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderIcon)": {
      ...infoCardHeader
    }
  },
  primaryCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderIcon)": {
      ...primaryCardHeader
    }
  },
  roseCardHeader: {
    color: whiteColor,
    "&:not($cardHeaderIcon)": {
      ...roseCardHeader
    }
  }
};

export default cardHeaderStyle;
