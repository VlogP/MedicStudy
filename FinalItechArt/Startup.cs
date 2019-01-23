using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.DB.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FinalItechArt.Web.Infrastructure;
using FinalltechArt.Service.Interfaces;
using FinalltechArt.Service.Services;
using AutoMapper;



namespace FinalItechArt
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            
            services.AddMvc();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                      
                        ValidateIssuer = true,
                       
                        ValidIssuer = AuthOptions.ISSUER,
                     
                        ValidateAudience = true,
                        
                        ValidAudience = AuthOptions.AUDIENCE,
                  
                        ValidateLifetime = true,

                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                      
                        ValidateIssuerSigningKey = true,

                    };
                });


            string con = "Server=WSE-110-71\\SQLEXPRESS;Database=Medic;Trusted_Connection=True;MultipleActiveResultSets=true";
            services.AddDbContext<RepositoryContext>(options => options.UseSqlServer(con));

            services.AddScoped<IDrugRepository, DrugRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IClinicRepository, ClinicRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IVisitRepository, VisitRepository>();
            services.AddScoped<IRegisterService, RegisterService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICabinetService, CabinetService>();
            services.AddScoped<IDrugUnitService, DrugUnitService>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddSingleton(mapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {



            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();               
            }
          
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
