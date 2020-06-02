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
using AutoMapper;
using FinalItechArt.Web.Models;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.DBRepository;

namespace FinalItechArt.Web.Controllers
{
    [Route("patients/")]
    [ApiController]
    public class PatientController : Controller
    {
        private IPatientService myrep;
        private IMapper mapper;
        RepositoryContext repositoryContext;

        public PatientController( IPatientService myrep,IMapper mapper, RepositoryContext _repositoryContext)
        {
            this.myrep = myrep;
            this.mapper = mapper;
            repositoryContext = _repositoryContext;
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

        [Authorize(Roles = "Researcher")]
        [Route("update")]
        [HttpPost]
        public IActionResult UpdatePatient([FromBody]PatientAddViewModel patient)
        {
            string UserId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;

            var entity = repositoryContext.Patients.FirstOrDefault(item => item.PatientId == Int32.Parse(patient.PatientId));
            entity.Status = patient.Status.ToString();
            repositoryContext.Patients.Update(entity);
            repositoryContext.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IActionResult AddPatient([FromBody]PatientAddViewModel patient)
        {
            string UserId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;

            if (!myrep.AddPatient(mapper.Map<Patient>(patient), Int32.Parse(UserId))) return BadRequest();

            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetFullInfoAboutOne(int id)
        {          
            return Ok(myrep.GetFullInfoOne(id));
        }

        [HttpPost("{id}")]
        public IActionResult RegisterNewVisit(int id)
        {
           

            string UserId = "1"; //User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;

            if (!myrep.RegisterNewVisit(id,Int32.Parse(UserId))) return BadRequest();

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult NotFullCompleteResearch(int id)
        {


            if (!myrep.NotFullCompleteResearch(id)) return BadRequest();

            return Ok();
        }


    }
}