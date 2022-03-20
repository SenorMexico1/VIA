module.exports = async(content, isBlacklisted) => {
  if (isBlacklisted) {
    if      (content.includes("chinq"))   {return true;}
    else if (content.includes("chink"))   {return true;}
    else if (content.includes("gook"))    {return true;}
    else if (content.includes("wetback")) {return true;}
    else if (content.includes("beaner"))  {return true;}
    else if (content.includes("kike"))    {return true;}
    else if (content.includes("nigga"))   {return true;}
    else if (content.includes("nigger"))  {return true;}
    else if (content.includes("fag"))     {return true;}
    else if (content.includes("spic "))   {return true;}
    else if (content.includes(" coon"))   {return true;}
    else if (content == "spic")           {return true;}
    else if (content == "coon")           {return true;}
    else {return false;}
  }
  else {
    if      (content.includes("porn"))        {return true;}
    else if (content.includes("retard"))      {return true;}
    else if (content.includes("holocaust"))   {return true;}
    else if (content.includes(" nig "))       {return true;}
    else if (content == "nig")                {return true;}
    else {return false;}
  }
}