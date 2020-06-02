using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.Interfaces;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FinalItechArt.Web.Infrastructure;
using FinalltechArt.Service.Interfaces;
using DataTransferObject;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore.Internal;

namespace FinalItechArt.Web.Controllers
{
    [Route("drugmanage/")]
    [ApiController]
    public class DrugManageController : Controller
    {
        IMapper Mapper;
        IDrugUnitService DrugService;
        RepositoryContext repositoryContext;

        public DrugManageController(IDrugUnitService _DrugService, IMapper _Mapper, RepositoryContext _repositoryContext)
        {
            DrugService = _DrugService;
            Mapper = _Mapper;
            repositoryContext = _repositoryContext;

        }
        
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = DrugService.GetAll().ToList().Select(item => new
            {
                item.Description,
                item.Capacity,
                item.DrugUnitId,
                item.Count,
                item.Manufacturer,
                item.Name,
                DrugType = item.DrugType.Equals("1") ? "A" : item.DrugType.Equals("2") ? "B" : "C",
                DrugTypeId = item.DrugType
            }).ToList();

            return Ok(result);

        }

        [HttpPost]
        public IActionResult AddDrug([FromBody]DrugDTO NewDrug)
        {        
            DrugService.Add(Mapper.Map<DrugUnit>(NewDrug));

            return Ok();
        }

       
        [HttpPost]
        [Route("delete/")]
        public IActionResult DeleteDrug([FromBody]DrugDTO NewDrug)
        {     
            DrugService.Delete(Int32.Parse(NewDrug.DrugUnitId));

            return Ok();
        }

        [HttpPost]
        [Route("updateCount/")]
        public IActionResult UpdateCountDrug([FromBody]DrugDTO drug)
        {
            var drugEntity =  repositoryContext.DrugUnits.FirstOrDefault(item => item.DrugUnitId == Int32.Parse(drug.DrugUnitId));

            drugEntity.Count = drug.Count;
            repositoryContext.Update(drugEntity);
            repositoryContext.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Route("drugClinics")]
        public IActionResult GetDrugClinics()
        {
            var result = repositoryContext.DrugAtClinics.ToList().Select(item => new
            {
                item.Count,
                DrugName = item.DrugUnitName,
                ClinicName = repositoryContext.Clinics.FirstOrDefault(element => element.ClinicId.Equals(item.ClinicId.ToString())).Name
            }).ToList();


            return Ok(result);
        }

        [HttpPost]
        [Route("drugClinics")]
        public IActionResult UpdateDrugClinics([FromBody]DrugAtClinics drug)
        {
            var currentRow = repositoryContext.DrugAtClinics.FirstOrDefault(item => item.DrugUnitId == drug.DrugUnitId && item.ClinicId == drug.ClinicId);
            var mainDrug = repositoryContext.DrugUnits.FirstOrDefault(item => item.DrugUnitId == drug.DrugUnitId);

            if (currentRow == null)
            {
                mainDrug.Count -= drug.Count;
                repositoryContext.DrugAtClinics.Add(new DrugAtClinics
                {
                    ClinicId = drug.ClinicId,
                    Count = drug.Count,
                    DrugUnitId = drug.DrugUnitId,
                    DrugUnitName = drug.DrugUnitName
                });
                repositoryContext.DrugUnits.Update(mainDrug);
                repositoryContext.SaveChanges();
            }
            else
            {
                currentRow.Count += drug.Count;
                mainDrug.Count -= drug.Count;
                repositoryContext.DrugAtClinics.Update(currentRow);
                repositoryContext.DrugUnits.Update(mainDrug);
                repositoryContext.SaveChanges();
            }


            return Ok();
        }

        [HttpGet]
        [Route("drugClinicsResearcher")]
        public IActionResult GetDrugClinicsResearcher()
        {
            string userId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;
            var clinicId = repositoryContext.Users.FirstOrDefault(item => item.UserId == Int32.Parse(userId)).ClinicId;

            var result = repositoryContext.DrugAtClinics.ToList().Where(item1 => item1.ClinicId == Int32.Parse(clinicId)).Select(item => new
            {
                RowId = item.Id,
                item.Count,
                DrugName = item.DrugUnitName
            }).ToList();


            return Ok(result);
        }

        [HttpPost]
        [Route("visit")]
        public IActionResult AddVisit([FromBody]Visit visit)
        {
            string userId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;
            var clinicId = repositoryContext.Users.FirstOrDefault(item => item.UserId == Int32.Parse(userId)).ClinicId;
            var clinicDrugRow = repositoryContext.DrugAtClinics.FirstOrDefault(item => item.Id == visit.DrugAtClinicId.Value);

            clinicDrugRow.Count -= visit.Count.Value;

            repositoryContext.DrugAtClinics.Update(clinicDrugRow);
            repositoryContext.Visits.Add(visit);

            repositoryContext.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Route("visit/{id}")]
        public IActionResult GetVisits(int id)
        {
            var visits = repositoryContext.Visits.Where(item => item.PatientId == id).Select(element => new
            {
                element.VisitDate,
                Count = element.Count==null? 0 : element.Count,
                DrugName = repositoryContext.DrugAtClinics.FirstOrDefault(item => item.Id == element.DrugAtClinicId).DrugUnitName ?? "-"
            });
            
            return Ok(visits);
        }

        public class MyDataAnalyze
        {
            public string DrugName;

            public string Manufacturer;

            public int Id;

            public string Status;
        }

        public class MyStatisticData
        {
            public string DrugName;

            public string Manufacturer;

            public string ProcentGood;

            public int PatientsUsed;
        }

        [HttpGet]
        [Route("analyze")]
        public IActionResult Analyze()
        {
            var drugs = repositoryContext.DrugUnits.ToList();
            var myList = new List<MyDataAnalyze>();
            var myStaticData = new List<MyStatisticData>();

            foreach (var drug in drugs){
                foreach(var visit in repositoryContext.Visits)
                {
                    if(visit.DrugAtClinicId != null)
                    if(repositoryContext.DrugAtClinics.FirstOrDefault(item => item.Id == visit.DrugAtClinicId.Value)!=null)
                    {
                            if (repositoryContext.DrugAtClinics.FirstOrDefault(item => item.Id == visit.DrugAtClinicId.Value).DrugUnitId==drug.DrugUnitId)
                            {
                                var patient = repositoryContext.Patients.FirstOrDefault(item => item.PatientId == visit.PatientId);

                                if (myList.FirstOrDefault(item => item.Id == patient.PatientId) == null)
                                {
                                    myList.Add(new MyDataAnalyze
                                    {
                                        DrugName = drug.Name,
                                        Manufacturer = drug.Manufacturer,
                                        Id = patient.PatientId,
                                        Status = patient.Status
                                    });
                                }
                            }
                    }
                }
                if (myList.Count != 0) {
                    var count = myList.Where(item => Int32.Parse(item.Status) == 3).Count();
                    float result = (float)(float.Parse((count * 100).ToString())) / float.Parse(myList.Count().ToString());

                    myStaticData.Add(new MyStatisticData
                    {
                        DrugName = drug.Name,
                        Manufacturer = drug.Manufacturer,
                        ProcentGood = result==0 ? "0.00" : result.ToString("#.##"),
                        PatientsUsed = myList.Count()
                    });

                    myList.Clear();
                }
            }

            return Ok(myStaticData);
        }


        [Route("Sort")]
        [HttpPost]
        public IActionResult Sort([FromBody]DrugDTO NewDrug)
        {
                      
            return Ok(DrugService.Sort(NewDrug.Sort));
        }



    }
}