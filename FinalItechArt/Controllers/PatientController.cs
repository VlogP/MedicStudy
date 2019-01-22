using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FinalItechArt.Web.Infrastructure;
using FinalltechArt.Service.Interfaces;
using DataTransferObject;
using Microsoft.AspNetCore.Authorization;

namespace FinalItechArt.Web.Controllers
{
    [Route("patients/")]
    [ApiController]
    public class PatientController : Controller
    {
        private IPatientService myrep;
      
        public PatientController( IPatientService myrep)
        {
            this.myrep = myrep;          
        }

        [HttpGet]
        public IActionResult GetSponsor()
        {
            return Ok(myrep.GetAllSponsorPatients());
        }

        [Authorize(Roles ="Researcher")]
        [Route("researcher/")]
        [HttpGet]
        public IActionResult GetResearcher()
        {
            string UserId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;
            return Ok(myrep.GetAllResearcherPatients(Int32.Parse(UserId)));
        }

    }
}